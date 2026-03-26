import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

df = pd.read_csv("mail_data.csv")
data = df.where((pd.notnull(df)),'')

data['Category'] = data['Category'].replace({'spam': 0, 'ham': 1})

X = data['Message']
Y = data['Category']

X_train, X_test, Y_train, Y_test = train_test_split(X,Y , test_size=0.2, random_state=3)
feature_extraction = TfidfVectorizer (min_df= 1, stop_words = 'english', lowercase= True )
X_train_feature = feature_extraction.fit_transform(X_train)
X_test_feature = feature_extraction.transform(X_test)

Y_test = Y_test.astype('int')
Y_train = Y_train.astype('int')

model = LogisticRegression()
model.fit(X_train_feature, Y_train)
prediction_on_train_data = model.predict(X_train_feature)

accuracy_on_train_data = accuracy_score(Y_train, prediction_on_train_data)
prediction_on_test_data = model.predict(X_test_feature)
accuracy_on_test_data = accuracy_score(Y_test, prediction_on_test_data)

print(f"Training Accuracy: {accuracy_on_train_data}")
print(f"Testing Accuracy: {accuracy_on_test_data}")

# Save the trained model and vectorizer
joblib.dump(model, 'spam_model.pkl')
joblib.dump(feature_extraction, 'vectorizer.pkl')
print("Model and vectorizer saved successfully to spam_model.pkl and vectorizer.pkl.")
