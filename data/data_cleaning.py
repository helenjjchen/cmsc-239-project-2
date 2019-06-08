import pandas as pd


def combine_data(csv1, csv2):
    df1 = pd.read_csv(csv1)
    df2 = pd.read_csv(csv2, usecols=['id', 'review_scores_rating'])

    f = df1.merge(df2, how='left', on='id')

    return f


__name__ = '__main__'
if __name__ == '__main__':
    csv1 = 'listings.csv'
    csv2 = 'ratings.csv'
    df = combine_data(csv1, csv2)
    df.to_csv('chicago_data.csv', index=False)

