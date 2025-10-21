import moviepy.editor as mp
import speech_recognition as sr
import os

# Function to convert video to audio and transcribe the audio to text
def transcribe_video_to_text(video_path):
    # Convert video to audio
    clip = mp.VideoFileClip(video_path)
    audio_path = "temp_audio.wav"
    clip.audio.write_audiofile(audio_path)
    
    # Transcribe the audio to text
    recognizer = sr.Recognizer()
    audio_file = sr.AudioFile(audio_path)

    with audio_file as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Recognition request failed: {e}"


# Example usage
if __name__ == "__main__":
    video_path = "C:\\Users\\91994\\Downloads\\Hello.mp4"  # Replace with your video file path
    transcription = transcribe_video_to_text(video_path)
    print("Transcription:")
    print(transcription)



#=video_path = "C:\\Users\\91994\\Downloads\\Hello.mp4"  # Replace with your video file path


