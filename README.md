import numpy as np
from sklearn.model_selection import train_test_split

# Re-define 'is_layoff' to ensure both classes are present
# We assume that a total_laid_off value equal to the median (which was used for imputation)
# might represent a 'no layoff' scenario or a default, while values above it represent actual layoffs.
median_total_laid_off = 88.0 # This was the median observed earlier from df.describe()

# Create 'is_layoff': 0 if total_laid_off is the median imputation value, 1 otherwise
df['is_layoff'] = np.where(df['total_laid_off'] == median_total_laid_off, 0, 1)

print("New target variable 'is_layoff' created successfully with a more balanced distribution.")
print("Value counts for 'is_layoff':")
display(df['is_layoff'].value_counts())
display(df[['total_laid_off', 'is_layoff']].head())

# Re-select features (X) and target (y) with the updated 'is_layoff'
columns_to_exclude = [
    'total_laid_off',
    'percentage_laid_off',
    'date',
    'date_added',
    'company', # Exclude company as its aggregates are included and it's high cardinality
    'total_layoffs_by_company',
    'avg_percentage_laid_off_by_company',
    'funds_raised_per_laid_off', # Exclude derived features to prevent target leakage if not handled carefully
    'is_layoff' # This is our target variable
]

X = df.drop(columns=columns_to_exclude)
y = df['is_layoff']

# Re-split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"\nShape of X_train after re-split: {X_train.shape}")
print(f"Shape of y_train after re-split: {y_train.shape}")
print("Value counts for y_train after re-split:")
display(y_train.value_counts())
