#!/usr/bin/env python
# coding: utf-8

# # Импорт данных и библиотек

# In[24]:


import pandas as pd
import os, json
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import RegexpTokenizer
import torch

ank1 = open('анкета1.json',encoding="utf-8")
ank2 = open('anketa.json', encoding="utf-8")
ank1 = json.load(ank1)
ank2 = json.load(ank2)
ank1 = pd.DataFrame.from_dict(pd.json_normalize(ank1), orient = "columns")
ank2 = pd.DataFrame.from_dict(pd.json_normalize(ank2), orient = "columns")


# # Функция sentence_transformer (надо ее запустить)

# In[29]:


import asyncio
import nest_asyncio
from sentence_transformers import SentenceTransformer
nest_asyncio.apply()
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

async def sentence_transformer(ank1, ank2):
    ank1 = ank1.fillna(value="")
    ank2 = ank2.fillna(value="")
    ank1 = ank1.applymap(str)
    ank2 = ank2.applymap(str)
    ank1 = ank1.applymap(lambda x: word_tokenize(x))
    ank2 = ank2.applymap(lambda x: word_tokenize(x))
    tokenizer = RegexpTokenizer(r'\w+')#first tokenizer
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
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings1 = model.encode(ank1_string, convert_to_tensor=True)
    embeddings2 = model.encode(ank2_string, convert_to_tensor=True)
    cosine_scores = util.cos_sim(embeddings1, embeddings2)
    cosine_scores = cosine_scores.flatten()
    perc_scores = cosine_scores * 100
    final_df = pd.DataFrame()
    final_df['percentage'] = pd.Series(perc_scores)
    final_df['similarity'] = pd.Series(cosine_scores)
    final_df['Имя'] = ank1['Имя']
    final_df['Фамилия'] = ank1['Фамилия']
    final_df['Email'] = ank1['Контактная информация.Электронная почта']
    return 'Similarity:' + str(final_df['percentage'].item()) + ' ' + '%'
print(loop.run_until_complete(sentence_transformer(ank1,ank2)))
loop.close()


# In[ ]:




