import sys
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa
import torch
import moviepy.editor as mp
import os
from pdfminer.high_level import extract_text
from sentence_transformers import SentenceTransformer, util

processor = WhisperProcessor.from_pretrained("openai/whisper-tiny.en")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny.en")

def extract_text_from_pdf_with_pdfminer(pdf_path):
    # Extract text using pdfminer.six
    text = extract_text(pdf_path)
    return text

def load_audio(file_path):
    audio, sampling_rate = librosa.load(file_path, sr=16000)  # Load and resample to 16kHz
    return audio, sampling_rate

def chunk_audio(audio, chunk_length=30):
    sampling_rate = 16000
    chunk_length_samples = chunk_length * sampling_rate
    return [audio[i:i + chunk_length_samples] for i in range(0, len(audio), chunk_length_samples)]

def extract_audio_from_video(video_path, audio_path):
    video = mp.VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)

def compare_texts(text1, text2, model_name='all-MiniLM-L6-v2'):
    # Load the pre-trained model
    model = SentenceTransformer(model_name)
    
    # Encode the texts
    embedding1 = model.encode(text1, convert_to_tensor=True)
    embedding2 = model.encode(text2, convert_to_tensor=True)
    
    # Compute cosine similarity
    cosine_similarity = util.pytorch_cos_sim(embedding1, embedding2)
    
    return cosine_similarity.item()

if __name__ == "__main__":

    #pdf_path = sys.argv[1]
    video_path = sys.argv[2]

    audio_path = "extracted_audio.wav"
    extract_audio_from_video(video_path, audio_path)
    
    file_path = "extracted_audio.wav"  
    
    # Load and process the audio file
    audio, sampling_rate = load_audio(file_path)
    audio_chunks = chunk_audio(audio)
    
    # Prepare to store the full transcription
    full_transcription = []
    
    # Process each chunk
    for chunk in audio_chunks:
        input_features = processor(chunk, sampling_rate=sampling_rate, return_tensors="pt").input_features
        predicted_ids = model.generate(input_features, max_length=1024000000000)  # Increase max_length to handle longer outputs
        transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
        full_transcription.append(transcription)
    
    # Combine the transcriptions from each chunk
    final_transcription = " ".join(full_transcription)
    
    # Print the full transcription
    # print("Full Transcription:", final_transcription)

    os.remove(audio_path)
    
    # Save the transcription to a text file
    # with open("transcription1.txt", "w") as f:
    #    f.write(final_transcription)


    pdf_path = sys.argv[1]
    extracted_text = "PDF Text: "+ extract_text_from_pdf_with_pdfminer(pdf_path)
    # print(extracted_text)


    similarity = compare_texts(final_transcription, extracted_text)
    print(f'Textual similarity: {(similarity+1)/2:.4f}')