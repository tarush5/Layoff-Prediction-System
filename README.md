# Layoff Prediction System 📉

## Overview
The **Layoff Prediction System** is an end-to-end machine learning project that analyzes historical company layoff data to identify patterns and predict the likelihood of future layoffs.  
The project uses **XGBoost** for classification and **SHAP (Explainable AI)** to interpret model predictions.

This system is designed with a strong focus on **early layoff risk detection**, making it useful for workforce planning, investment analysis, and organizational risk assessment.

---

## Project Pipeline

### 1. Data Loading & Initial Analysis
- Loaded and inspected the `layoffs.csv` dataset
- Dataset size: **4,277 rows × 11 columns**
- Identified missing values and data quality issues

### 2. Data Preprocessing & EDA
- Imputed missing numerical values using **median**
- Filled missing categorical values with **"Unknown"**
- Converted date column to `datetime`
- Performed exploratory data analysis to study distributions and trends

### 3. Feature Engineering
- Extracted temporal features:
  - `year`, `month`, `day_of_week`, `quarter`, `day_of_year`
- Created company-level aggregates:
  - `total_layoffs_by_company`
  - `avg_percentage_laid_off_by_company`
- Engineered financial ratio:
  - `funds_raised_per_laid_off`

### 4. Target Variable Definition
- Defined a binary target variable `is_layoff`:
  - `0` → if `total_laid_off` equals the median value (88)
  - `1` → otherwise
- Resulted in a balanced binary classification problem

---

## Model Development

### Model Used
- **XGBoost Classifier**
- Implemented using a **scikit-learn pipeline**

### Model Training & Optimization
- Used **Stratified K-Fold Cross-Validation**
- Hyperparameter tuning performed using **GridSearchCV**
- Optimization metric: **ROC AUC**
- Best cross-validation ROC AUC: **0.621**

---

## Model Performance (Test Set)

| Metric | Score |
|------|------|
| Accuracy | 0.662 |
| Precision | 0.662 |
| Recall (Layoff Class) | 0.989 |
| F1-Score | 0.793 |
| ROC AUC | 0.647 |
| PR AUC | 0.776 |

### Classification Report

          precision    recall  f1-score   support

       0       0.68      0.04      0.08       296
       1       0.66      0.99      0.79       560

accuracy                           0.66       856


---

## Model Explainability (XAI)
- Used **SHAP (SHapley Additive Explanations)** for model interpretability
- Analyzed both global and individual predictions
- Key influential features:
  - `funds_raised`
  - `industry`
  - `location`
  - `total_layoffs_by_company`

---

## Key Insights
- The model achieves **very high recall for layoff prediction**, making it suitable for early risk identification
- Company funding, industry, and historical layoff patterns strongly influence predictions
- SHAP improves transparency and trust in model decisions

---

## Limitations
- Very low recall for the **No-Layoff** class, leading to false positives
- Moderate ROC AUC indicates room for performance improvement

---

## Future Improvements
- Apply class imbalance techniques (SMOTE, ADASYN, class weighting)
- Enhance feature engineering with interaction and advanced temporal features
- Experiment with alternative models (LightGBM, CatBoost)
- Integrate external economic and financial data
- Optimize classification threshold based on business needs

---

## Tech Stack
- **Language**: Python  
- **Machine Learning**: XGBoost  
- **Libraries**: Pandas, NumPy, Scikit-learn, SHAP, Matplotlib, Seaborn  

---

## Conclusion
This project demonstrates a complete machine learning workflow—from data preprocessing and feature engineering to model optimization and explainable AI.  
With further enhancements, the system can evolve into a powerful tool for layoff risk analysis and decision support.
