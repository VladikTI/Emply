#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Импорт данных
import os, json
import asyncio
import pandas as pd
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import RegexpTokenizer
import time
CV = CountVectorizer()
final_df = pd.DataFrame()
ank1 = open('анкета1.json',encoding="utf-8")
ank2 = open('anketa.json', encoding="utf-8")
ank1 = json.load(ank1)
ank2 = json.load(ank2)
ank1 = pd.DataFrame.from_dict(pd.json_normalize(ank1), orient = "columns")
ank2 = pd.DataFrame.from_dict(pd.json_normalize(ank2), orient = "columns")


# In[2]:


#Единая функция обработки и результата программы(вывод процента схожести)
import nest_asyncio
import math
nest_asyncio.apply()
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
start_time = time.time()
async def program(ank1, ank2):
    ank1 = ank1.fillna(value="")
    ank2 = ank2.fillna(value="")
    ank1 = ank1.applymap(str)
    ank2 = ank2.applymap(str)
    ank1 = ank1.applymap(lambda x: word_tokenize(x))
    ank2 = ank2.applymap(lambda x: word_tokenize(x))
    tokenizer = RegexpTokenizer(r'\w+')
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
    cosine_matrix = CV.fit_transform(ank1['soup'])
    cosine_matrix2 = CV.transform(ank2['soup'])
    cosine_sim = cosine_similarity(cosine_matrix, cosine_matrix2)
    cosine_sim = cosine_sim.flatten()
    perc_dist = cosine_sim * 100
    final_df['similarities'] = pd.Series(cosine_sim)
    final_df['percentage'] = pd.Series(perc_dist)
    final_df['name'] = ank1['Имя']
    final_df['surname'] = ank1['Фамилия']
    final_df['email'] = ank1['Контактная информация.Электронная почта']
    return 'Similarity:' + ' ' + str(final_df['percentage'].item())+ ' ' + '%'
print(loop.run_until_complete(program(ank1, ank2)))
loop.close()


# In[3]:


#функция расчета процента прохода
def client(email):
    if (final_df['percentage'] > 0.7).any():
        return 'Скорее всего вы пройдете! Ура!'
    elif (final_df['percentage']<0.7).any() and (final_df['percentage'] >= 0.5).any():
        return 'Ваши шансы высоки!'
    elif (final_df['percentage']<0.5).any() and (final_df['percentage'] >= 0.3).any():
        return 'Возможно вы пройдете дальше!'
    else:
        return 'Сожалеем, но скорее всего вы не пройдете на следующий этап('


# In[ ]:




