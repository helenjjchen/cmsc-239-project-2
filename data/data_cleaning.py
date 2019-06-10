import pandas as pd


def combine_data(csv1, csv2):
    df1 = pd.read_csv(csv1)
    df1.drop(['neighbourhood_group', 'neighbourhood'], axis=1)
    df2 = pd.read_csv(csv2, usecols=['id', 'review_scores_rating', 'first_review', 'neighbourhood_cleansed'])

    f = df1.merge(df2, how='left', on='id')

    return f


__name__ = '__main__'
if __name__ == '__main__':
    c1 = 'listings.csv'
    c2 = 'listings_full.csv'
    df = combine_data(c1, c2)
    df.to_csv('chicago_data.csv', index=False)

