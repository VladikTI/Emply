#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#transformers
from sentence_transformers import SentenceTransformer
from transformers import BertTokenizer
from transformers import get_linear_schedule_with_warmup
import torch
import torch.optim as optim
from tqdm import tqdm
#model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
if torch.cuda.is_available():    
    device = torch.device("cuda")
    print(f'There are {torch.cuda.device_count()} GPU(s) available.')
    print('We will use the GPU:', torch.cuda.get_device_name(0))
else:
    print('No GPU available, using the CPU instead.')
    device = torch.device("cpu")


# In[ ]:


import torch
from transformers import BertTokenizer, BertModel
from tqdm import tqdm 
from sentence_transformers import SentenceTransformer
import tensorflow as tf 


# In[ ]:


import numpy as np

nest_asyncio.apply()
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

async def rubert(ank1, ank2):
    input_ids = []
    attention_mask = []
    ank1 = ank1.fillna(value="")
    ank2 = ank2.fillna(value="")
    ank1 = ank1.applymap(str)
    ank2 = ank2.applymap(str)
    ank1 = ank1.applymap(lambda x: word_tokenize(x))
    ank2 = ank2.applymap(lambda x: word_tokenize(x))
    tokenizer = RegexpTokenizer(r'\w+')#first tokenizer
    model = BertModel.from_pretrained("cointegrated/rubert-tiny2")#rubert model
    #data preprocessing
    ank1=ank1.applymap(str)
    ank2=ank2.applymap(str)
    ank1['Опыт работы'] = ank1['Опыт работы'].map(tokenizer.tokenize)
    ank1['Образование'] = ank1['Образование'].map(tokenizer.tokenize)
    ank1['Проекты'] = ank1['Проекты'].map(tokenizer.tokenize)
    ank1['Дополнительная информация'] = ank1['Дополнительная информация'].map(tokenizer.tokenize)
    ank1['Навыки.Язык программирования'] = ank1['Навыки.Язык программирования'].map(tokenizer.tokenize)
    ank1['Навыки.Фреймворки'] = ank1['Навыки.Фреймворки'].map(tokenizer.tokenize)
    ank1['Навыки.Базы данных'] = ank1['Навыки.Базы данных'].map(tokenizer.tokenize)
    ank1['Навыки.Работа с API'] = ank1['Навыки.Работа с API'].map(tokenizer.tokenize)
    ank1['Навыки.Инструменты'] = ank1['Навыки.Инструменты'].map(tokenizer.tokenize)
    ank1['Языки.Русский'] = ank1['Языки.Русский'].map(tokenizer.tokenize)
    ank1['Языки.Английский'] = ank1['Языки.Английский'].map(tokenizer.tokenize)
    ank2['Опыт работы'] = ank2['Опыт работы'].map(tokenizer.tokenize)
    ank2['Образование'] = ank2['Образование'].map(tokenizer.tokenize)
    ank2['Проекты'] = ank2['Проекты'].map(tokenizer.tokenize)
    ank2['Дополнительная информация'] = ank2['Дополнительная информация'].map(tokenizer.tokenize)
    ank2['Навыки.Язык программирования'] = ank2['Навыки.Язык программирования'].map(tokenizer.tokenize)
    ank2['Навыки.Фреймворки'] = ank2['Навыки.Фреймворки'].map(tokenizer.tokenize)
    ank2['Навыки.Базы данных'] = ank2['Навыки.Базы данных'].map(tokenizer.tokenize)
    ank2['Навыки.Работа с API'] = ank2['Навыки.Работа с API'].map(tokenizer.tokenize)
    ank2['Навыки.Инструменты'] = ank2['Навыки.Инструменты'].map(tokenizer.tokenize)
    ank2['Языки.Русский'] = ank2['Языки.Русский'].map(tokenizer.tokenize)
    ank2['Языки.Английский'] = ank2['Языки.Английский'].map(tokenizer.tokenize)
    ank1['Опыт работы'] = ank1['Опыт работы'].astype(str).str.lower()
    ank1['Образование'] = ank1['Образование'].astype(str).str.lower()
    ank1['Проекты'] = ank1['Проекты'].astype(str).str.lower()
    ank1['Дополнительная информация'] = ank1['Дополнительная информация'].astype(str).str.lower()
    ank1['Навыки.Язык программирования'] = ank1['Навыки.Язык программирования'].astype(str).str.lower()
    ank1['Навыки.Фреймворки'] = ank1['Навыки.Фреймворки'].astype(str).str.lower()
    ank1['Навыки.Базы данных'] = ank1['Навыки.Базы данных'].astype(str).str.lower()
    ank1['Навыки.Работа с API'] = ank1['Навыки.Работа с API'].astype(str).str.lower()
    ank1['Навыки.Инструменты'] = ank1['Навыки.Инструменты'].astype(str).str.lower()
    ank1['Языки.Русский'] = ank1['Языки.Русский'].astype(str).str.lower()
    ank1['Языки.Английский'] = ank1['Языки.Английский'].astype(str).str.lower()
    ank2['Опыт работы'] = ank2['Опыт работы'].astype(str).str.lower()
    ank2['Образование'] = ank2['Образование'].astype(str).str.lower()
    ank2['Проекты'] = ank2['Проекты'].astype(str).str.lower()
    ank2['Дополнительная информация'] = ank2['Дополнительная информация'].astype(str).str.lower()
    ank2['Навыки.Язык программирования'] = ank2['Навыки.Язык программирования'].astype(str).str.lower()
    ank2['Навыки.Фреймворки'] = ank2['Навыки.Фреймворки'].astype(str).str.lower()
    ank2['Навыки.Базы данных'] = ank2['Навыки.Базы данных'].astype(str).str.lower()
    ank2['Навыки.Работа с API'] = ank2['Навыки.Работа с API'].astype(str).str.lower()
    ank2['Навыки.Инструменты'] = ank2['Навыки.Инструменты'].astype(str).str.lower()
    ank2['Языки.Русский'] = ank2['Языки.Русский'].astype(str).str.lower()
    ank2['Языки.Английский'] = ank2['Языки.Английский'].astype(str).str.lower()
    ank1['soup'] = ank1.apply(lambda row: row['Опыт работы'] + row['Образование'] + row['Проекты'] + row['Дополнительная информация'] + row['Навыки.Язык программирования'] + row['Навыки.Фреймворки'] + row['Навыки.Базы данных'] + row['Навыки.Работа с API'] + row['Навыки.Инструменты'] + row['Языки.Русский'] + row['Языки.Английский'], axis=1)
    ank2['soup'] = ank2.apply(lambda row: row['Опыт работы'] + row['Образование'] + row['Проекты'] + row['Дополнительная информация'] + row['Навыки.Язык программирования'] + row['Навыки.Фреймворки'] + row['Навыки.Базы данных'] + row['Навыки.Работа с API'] + row['Навыки.Инструменты'] + row['Языки.Русский'] + row['Языки.Английский'], axis=1)
    
    tokenizer2 = BertTokenizer.from_pretrained('cointegrated/rubert-tiny')#bert tokenizer
    ank1_string = str(ank1['soup'])
    ank2_string = str(ank2['soup'])
    
    encoded_dict = tokenizer2.encode_plus(#encoding
                    [ank1_string, ank2_string],                      # Sentence to encode.
                    add_special_tokens = True, # Add '[CLS]' and '[SEP]'
                    pad_to_max_length = True,
                    return_attention_mask = True,   # Construct attn. masks.
                    return_tensors = 'pt',     # Return pytorch tensors.
               )
    input_ids.append(encoded_dict['input_ids'])#list of input ids
    attention_mask.append(encoded_dict['attention_mask'])#list of attention masks
    input_id = torch.cat(input_ids, dim=1)#concating input ids tensors
    attention_masks = torch.cat(attention_mask, dim=1)#concating tensors attention mask
    output = model(**encoded_dict)#outputs
    embeddings = output.last_hidden_state#embeddings
    mask = encoded_dict['attention_mask'].unsqueeze(-1).expand(embeddings.size()).float()#mask
    masked_embeddings = embeddings * mask#masked embeddings
    summed = torch.sum(masked_embeddings, 1)
    counted = torch.clamp(mask.sum(1), min=1e-9)
    mean_pooled = summed / counted
    mean_pooled = mean_pooled.detach().numpy()
    scores = np.zeros((mean_pooled.shape[0], mean_pooled.shape[0]))#sim scores
    for i in range(mean_pooled.shape[0]):
        scores[i, :] = cosine_similarity(
            [mean_pooled[i]],
            mean_pooled
        )[0]
    perc_score = scores*100#percentage
    
    return 'Similarity score:' + str(perc_score) + '%'

print(loop.run_until_complete(rubert(ank1, ank2)))
loop.close()


# In[ ]:


#Часть с рекомендациями- хуйня
from numpy import dot
from numpy.linalg import norm
from scipy.spatial.distance import cosine
data = open('forms.json', encoding='utf-8')
data = json.load(data)
data = pd.DataFrame.from_dict(pd.json_normalize(data), orient='columns')
def get_recommendations(data):
    input_ids = []
    attention_mask = []
    data = data.fillna(value="")
    data = data.applymap(str)
    tokenizer = RegexpTokenizer(r'\w+')
    data['Опыт работы'] = data['Опыт работы'].map(tokenizer.tokenize)
    data['Образование'] = data['Образование'].map(tokenizer.tokenize)
    data['Проекты'] = data['Проекты'].map(tokenizer.tokenize)
    data['Дополнительная информация'] = data['Дополнительная информация'].map(tokenizer.tokenize)
    data['Навыки.Язык программирования'] = data['Навыки.Язык программирования'].map(tokenizer.tokenize)
    data['Навыки.Фреймворки'] = data['Навыки.Фреймворки'].map(tokenizer.tokenize)
    data['Навыки.Базы данных'] = data['Навыки.Базы данных'].map(tokenizer.tokenize)
    data['Навыки.Работа с API'] = data['Навыки.Работа с API'].map(tokenizer.tokenize)
    data['Навыки.Инструменты'] = data['Навыки.Инструменты'].map(tokenizer.tokenize)
    data['Языки.Русский'] = data['Языки.Русский'].map(tokenizer.tokenize)
    data['Языки.Английский'] = data['Языки.Английский'].map(tokenizer.tokenize)
    data['Опыт работы'] = data['Опыт работы'].astype(str).str.lower()
    data['Образование'] = data['Образование'].astype(str).str.lower()
    data['Проекты'] = data['Проекты'].astype(str).str.lower()
    data['Дополнительная информация'] = data['Дополнительная информация'].astype(str).str.lower()
    data['Навыки.Язык программирования'] = data['Навыки.Язык программирования'].astype(str).str.lower()
    data['Навыки.Фреймворки'] = data['Навыки.Фреймворки'].astype(str).str.lower()
    data['Навыки.Базы данных'] = data['Навыки.Базы данных'].astype(str).str.lower()
    data['Навыки.Работа с API'] = data['Навыки.Работа с API'].astype(str).str.lower()
    data['Навыки.Инструменты'] = data['Навыки.Инструменты'].astype(str).str.lower()
    data['Языки.Русский'] = data['Языки.Русский'].astype(str).str.lower()
    data['Языки.Английский'] = data['Языки.Английский'].astype(str).str.lower()
    data['soup'] = data.apply(lambda row: row['Опыт работы'] + row['Образование'] + row['Проекты'] + row['Дополнительная информация'] + row['Навыки.Язык программирования'] + row['Навыки.Фреймворки'] + row['Навыки.Базы данных'] + row['Навыки.Работа с API'] + row['Навыки.Инструменты'] + row['Языки.Русский'] + row['Языки.Английский'], axis=1)
    
    tokenizer2 = BertTokenizer.from_pretrained('cointegrated/rubert-tiny')#bert tokenizer
    model = BertModel.from_pretrained("cointegrated/rubert-tiny2")#rubert model
    # Define the dataset and the last row
    X = data.iloc[:306]
    X = X.soup.values
    y = data.iloc[[307]]
    y = y.soup.values
    X_string = str(X)
    y_string = str(y)
    # Tokenize and encode the dataset and the last row
    inputs = tokenizer2(X_string, padding=True, truncation=True, return_tensors="pt")
    last_row_input = tokenizer2(y_string, padding=True, truncation=True, return_tensors="pt")
    # Get the BERT embeddings for the dataset and the last row
    with torch.no_grad():
        dataset_outputs = model(**inputs)
        last_row_output = model(**last_row_input)
    # Calculate the cosine similarity between the last row and each row in the dataset
    similarities = []
    cos = torch.nn.CosineSimilarity(dim=0) 
    for i in range(len(data)):
        similarity = dot(dataset_outputs.last_hidden_state.mean(), last_row_output.last_hidden_state[0])/(norm(dataset_outputs.last_hidden_state.mean())*norm(last_row_output.last_hidden_state[0]))
        #similarity = cos(dataset_outputs.last_hidden_state.mean(), last_row_output.last_hidden_state[0]).numpy()
        similarities.append(similarity)

    print("Semantic similarities:", similarities)
    # Get the scores of the 10 most similar user forms
    sim_scores = perc_score[1:11]
    ans = pd.DataFrame(sim_scores, columns=['indexes', 'sim_scores'])
    ans = ans.drop('indexes', axis=1)

    # Get the user indices
    user_indices = [i[0] for i in sim_scores]
    ans['user_indices'] = user_indices
    ans['names'] = X['Имя'].iloc[user_indices].values

    # Return the top 10 most similar forms
    print('Топ 10 кандидатов:')
    return ans
print(get_recommendations(data))

