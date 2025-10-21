
from sentence_transformers import SentenceTransformer, util
import os

# Load pre-trained SentenceTransformer model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Function to read file content
def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Function to compute cosine similarity
def compute_cosine_similarity(text1, text2):
    embeddings = model.encode([text1, text2], convert_to_tensor=True)
    cosine_score = util.pytorch_cos_sim(embeddings[0], embeddings[1])
    return cosine_score.item()


# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['test']  # Replace with your database name
collection = db['similarity_results']  # Replace with your collection name



directory = 'c:/Users/akhil/OneDrive/Desktop/Full_web-2/Full_web-2/backend/'

# Paths to the text files
file1_path = os.path.join(directory, 'DBMS PROGRAMS_240704_113257.txt')
file2_path = os.path.join(directory, 'os _240704_143706.txt')

# Read the content of the files
text1 = read_file(file1_path)
text2 = read_file(file2_path)

# Compute similarity
similarity = compute_cosine_similarity(text1, text2)

# Normalize to [0, 1] range
normalized_similarity = (similarity + 1) / 2

print(f"Normalized Similarity between {file1_path} and {file2_path}: {normalized_similarity:.4f}")

# print(f"Sentence-BERT Cosine Similarity between {file1_path} and {file2_path}: {similarity:.4f}")

# Create a document to insert into MongoDB
document = {
    "file1_path": file1_path,
    "file2_path": file2_path,
    "similarity": similarity
}

# Insert the document into MongoDB
result = collection.insert_one(document)
print(f"Inserted document ID: {result.inserted_id}")