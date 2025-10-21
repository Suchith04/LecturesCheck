import sys
import os
import moviepy.editor as mp
import speech_recognition as sr
from pydub import AudioSegment
import contextlib

#First Version of the backedn python code code invoking LLM

@contextlib.contextmanager
def suppress_stdout():
    with open(os.devnull, 'w') as devnull:
        old_stdout = sys.stdout
        sys.stdout = devnull
        try:
            yield
        finally:
            sys.stdout = old_stdout

def extract_audio_from_video(video_path, audio_path):
    video = mp.VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)

def convert_audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    audio = AudioSegment.from_file(audio_path)

    # Split audio into chunks (e.g., 30 seconds each)
    chunk_length_ms = 30000  # 30 seconds
    chunks = [audio[i:i + chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]

    # Initialize an empty string to hold the full transcription
    full_text = ""

    for i, chunk in enumerate(chunks):
        chunk.export("temp_chunk.wav", format="wav")
        with sr.AudioFile("temp_chunk.wav") as source:
            audio_data = recognizer.record(source)
            try:
                text = recognizer.recognize_google(audio_data)
                full_text += text + " "
                #print(f"Chunk {i + 1}/{len(chunks)} transcribed successfully!")
            except sr.UnknownValueError:
                print(f"Google Speech Recognition could not understand chunk {i + 1}")
            except sr.RequestError as e:
                print(f"Could not request results from Google Speech Recognition service for chunk {i + 1}; {e}")
    
    os.remove(audio_path)
    print(full_text)

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    video_path = sys.argv[2]

    audio_path = "extracted_audio.wav"    # The path for the extracted audio file

    extract_audio_from_video(video_path, audio_path)
    convert_audio_to_text(audio_path)
