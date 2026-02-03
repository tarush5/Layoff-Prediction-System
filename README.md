📉 Layoff Prediction System using Machine Learning (XGBoost + SHAP)
📌 Overview

The Layoff Prediction System is an end-to-end machine learning project designed to analyze historical layoff data and predict the likelihood of layoffs in companies.
Using advanced feature engineering, an optimized XGBoost classifier, and SHAP-based explainability, this project not only predicts layoffs but also explains why a prediction was made.

The system focuses on high recall for layoff events, making it particularly useful for early risk detection and workforce planning.

🚀 Project Objectives

Identify patterns and risk factors associated with company layoffs

Build a robust binary classification model for layoff prediction

Apply explainable AI (XAI) techniques to interpret model decisions

Evaluate model performance rigorously using cross-validation and multiple metrics

🧠 Project Pipeline
1️⃣ Data Loading & Initial Assessment

Loaded and inspected layoffs.csv

Dataset size: 4,277 rows × 11 columns

Identified missing values and data type inconsistencies

2️⃣ Data Preprocessing & Exploratory Data Analysis (EDA)

Imputed missing numerical values using median

Filled missing categorical values with "Unknown"

Converted date column to datetime

Performed EDA to understand:

Layoff distributions

Industry and location trends

Funding vs layoffs relationships

3️⃣ Advanced Feature Engineering

Created meaningful features to improve model learning:

Temporal Features

year, month, day_of_week

quarter, day_of_year

Company-Level Aggregates

total_layoffs_by_company

avg_percentage_laid_off_by_company

Financial Ratio

funds_raised_per_laid_off

4️⃣ Target Variable Definition

To ensure a usable binary classification task:

Defined is_layoff as:

0 → if total_laid_off == median (88)

1 → otherwise

This resulted in a balanced-enough dataset suitable for training:

Class 1 (Layoff): 2237

Class 0 (No Layoff): 1184

5️⃣ Model Training

Implemented an XGBoost Classifier

Built a scikit-learn pipeline including preprocessing

Used Stratified K-Fold Cross Validation for robustness

6️⃣ Model Optimization

Performed hyperparameter tuning using GridSearchCV

Optimization metric: ROC AUC

Best cross-validation ROC AUC: 0.6210

7️⃣ Model Interpretation (Explainable AI)

Applied SHAP (SHapley Additive Explanations) for interpretability

Generated:

Global feature importance (SHAP summary plots)

Local explanations (force plots)

Key influential features included:

funds_raised

industry

location

total_layoffs_by_company

📊 Model Performance (Test Set)
Metric	Score
Accuracy	0.6624
Precision	0.6619
Recall (Layoff Class)	0.9893
F1-Score	0.7931
ROC AUC	0.6474
PR AUC	0.7756
📄 Classification Report
              precision    recall  f1-score   support

           0       0.68      0.04      0.08       296
           1       0.66      0.99      0.79       560

    accuracy                           0.66       856
   macro avg       0.67      0.52      0.44       856
weighted avg       0.67      0.66      0.55       856

🔍 Key Insights

The model achieves very high recall for layoff prediction, making it suitable for early risk detection

Explainability via SHAP ensures transparent and interpretable predictions

Company funding, industry, and historical layoff behavior strongly influence predictions

🧩 Potential Use Cases

Risk Assessment: Identify companies at high risk of layoffs

Strategic Planning: Support decision-making for employees, investors, and HR teams

Workforce Analytics: Monitor layoff trends across industries and regions

⚠️ Limitations

Low recall for “No Layoff” class (0.04)
→ The model is biased toward predicting layoffs, leading to false positives

Moderate ROC AUC (0.6474)
→ Indicates room for improvement in class separation

🔮 Future Enhancements

Apply class imbalance techniques:

SMOTE / ADASYN

Cost-sensitive learning

Class-weight tuning in XGBoost

Improve feature engineering with:

Interaction features

Advanced temporal patterns

Experiment with alternative models:

LightGBM

CatBoost

Ensemble stacking

Integrate external data sources:

Economic indicators

Company financial health

News sentiment analysis

Optimize decision thresholds based on business impact

🛠️ Tech Stack

Programming Language: Python

ML Model: XGBoost

Libraries:

Pandas, NumPy

Scikit-learn

SHAP

Matplotlib, Seaborn
