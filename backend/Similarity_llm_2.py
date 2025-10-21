from sentence_transformers import SentenceTransformer, util

def compare_texts(text1, text2, model_name='all-MiniLM-L6-v2'):
    # Load the pre-trained model
    model = SentenceTransformer(model_name)
    
    # Encode the texts
    embedding1 = model.encode(text1, convert_to_tensor=True)
    embedding2 = model.encode(text2, convert_to_tensor=True)
    
    # Compute cosine similarity
    cosine_similarity = util.pytorch_cos_sim(embedding1, embedding2)
    
    return cosine_similarity.item()

# Example usage
text1 = "Hey, How are You?"
text2 = "Hi, Are You Fine?"

similarity = compare_texts(text1, text2)
print(f'Textual similarity: {(similarity+1)/2:.4f}')
