import pandas as pd

__name__ = '__main__'

if __name__ == '__main__':
    csv1 = 'listings_full.csv'
    df1 = pd.read_csv(csv1, usecols=['id', 'name', 'review_scores_rating', 'first_review', 'latitude', 'longitude',
                                     'room_type', 'number_of_reviews', 'neighbourhood_cleansed', 'price',
                                     'monthly_price', 'weekly_price', 'host_is_superhost'])

    df1['price'] = df1['price'].str.replace('$', '')
    df1['price'] = df1['price'].str.replace(',', '')

    df1['monthly_price'] = df1['monthly_price'].str.replace('$', '')
    df1['monthly_price'] = df1['monthly_price'].str.replace(',', '')
    df1['monthly_price'].fillna(0, inplace=True)

    df1['weekly_price'] = df1['weekly_price'].str.replace('$', '')
    df1['weekly_price'] = df1['weekly_price'].str.replace(',', '')
    df1['weekly_price'].fillna(0, inplace=True)

    df1 = df1[df1.number_of_reviews != 0]
    df1['price'] = df1['price'].astype(float)
    df1 = df1[df1.price != 0]

    df1['monthly_price'] = df1.apply(
      lambda row: row['price'] * 365 / 12 if row['monthly_price'] == 0 else row['monthly_price'],
      axis=1
    )

    df1['weekly_price'] = df1.apply(
      lambda row: row['price'] * 365 / 52 if row['weekly_price'] == 0 else row['weekly_price'],
      axis=1
    )

    df1['first_year'] = df1['first_review'].str[:4]
    df1['first_year'] = df1['first_year'].astype(int)

    df1.dropna(subset=['review_scores_rating'], inplace=True)
    df1['host_is_superhost'].replace('t', 1, inplace=True)
    df1['host_is_superhost'].replace('f', 0, inplace=True)

    print len(df1['first_year'].unique())

    df1.to_csv('chicago_data.csv', index=False)

