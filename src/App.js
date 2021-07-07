import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import NewsCards from './components/NewsCards/NewsCards';

const alanKey = '<API Key>';

const App = () => {
  document.title = "Voice News Application";
  const classes = useStyles();
  document.title = "Voice News Application";
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  }, []);
  return (
    <>
      <h1>Voice News Application</h1>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://images.unsplash.com/photo-1554446422-d05db23719d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80" className={classes.alanLogo} alt="Voice News App Logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/aryan-garg-661552198/"> ARYAN GARG</a> -
            <a className={classes.link} href="https://github.com/code08-ind"> ARYAN GARG</a>
          </Typography>
          <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Circle-icons-news.svg/1200px-Circle-icons-news.svg.png" height="50px" alt="Voice News Application" />
        </div>
      ) : null}
    </>
  );
}

export default App;
