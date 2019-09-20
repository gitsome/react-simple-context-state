import axios from 'axios';

class TwitterService {
  getTweetsForUser (twitterHandle) {
    return new Promise((resolve, reject) => {

      const hasFailed = (Math.round(Math.random()) === 0);

      axios.get('https://raw.githubusercontent.com/gitsome/react-simple-context-state/master/sample-react-app/src/StateStores/UserStateStore.js', { responseType: 'text', transformResponse: undefined }).then(response => {
        console.log( typeof response.data );
        // output `object` , not `string`, why?
        console.log( response.data );
        // output Array(false, 5), not "[false,5]"
      });



      setTimeout(() => {
          if (hasFailed) {
            return reject(new Error('oops'));
          }

          resolve([
            '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">7. Finally, if you reload the page, DevTools will now try its best to restore your previous position in the tree and your selection. Even if those components load asynchronously! <a href="https://t.co/46rMbeKQ1U">pic.twitter.com/46rMbeKQ1U</a></p>&mdash; React (@reactjs) <a href="https://twitter.com/reactjs/status/1162313707281702912?ref_src=twsrc%5Etfw">August 16, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
            '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Pretty awesome <a href="https://twitter.com/hashtag/programming?src=hash&amp;ref_src=twsrc%5Etfw">#programming</a> music<a href="https://t.co/XofhdwfwwR">https://t.co/XofhdwfwwR</a></p>&mdash; John David Martin 🧠💻 (@JohnDavidFive) <a href="https://twitter.com/JohnDavidFive/status/1170937596286881792?ref_src=twsrc%5Etfw">September 9, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
            '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Node+JS Interactive Schedule is live and full of great and insightful talks ( Like this one by <a href="https://twitter.com/JoyeeCheung?ref_src=twsrc%5Etfw">@JoyeeCheung</a>- How Node.js Bootstraps Itself: 2019 Edition, <a href="https://t.co/RcAZrVK7ab">https://t.co/RcAZrVK7ab</a> ) Don&#39;t miss your chance to get the Early Bird 🐦registration! Discount goes away forever Sept. 20th!</p>&mdash; Node.js (@nodejs) <a href="https://twitter.com/nodejs/status/1173695707217301504?ref_src=twsrc%5Etfw">September 16, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
          ]);
      }, 1500);
    });
  }
}

export default new TwitterService();