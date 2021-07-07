import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles.js';

const infoCards = [
    { color: '#480032', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#03256C', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science etc.', text: 'Give me the latest Technology news' },
    { color: '#393E46', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#CD113B', title: 'News by Sources', info: 'Axios, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from BBC-NEWS' },
];

const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();

    if (!articles.length) {
        return (
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color, boxShadow: "1px 0px 18px 8px rgba(0,0,0,0.51)" }}>
                                <Typography variant="h5" component="h5">
                                    <span style={{ textTransform: "capitalize" }}>
                                        {infoCard.title}
                                    </span>
                                </Typography>
                                {infoCard.info ? <Typography variant="body2" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                                <Typography variant="body2" component="h6">Try saying: <br /> <i style={{ textTransform: "capitalize" }}>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'flex' }}>
                        <NewsCard activeArticle={activeArticle} i={i} article={article} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    );
};

export default NewsCards;