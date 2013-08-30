---
layout   : post
category : blog
tagline  : Add your Twitter timeline to your CakePHP application
note     : I made a gist of the plugin, <a href="https://gist.github.com/prbaron/4725934">https://gist.github.com/prbaron/4725934</a>
---

Twitter just changed its API so I decided to write my own library to display my Twitter feeds on my website.

Today, I will share it to you and I will teach you how to use it in your CakePHP website. The first thing you have to do is to [download the class](https://gist.github.com/prbaron/4725934) and to place it in you Lib folder.

Below is the single public method to find your tweets with all the default options.

    <?php
    $this->find(
        "prbaron", // Twitter account name 
        array(
            'count'            => 10, // number of tweets returned
            'exclude_replies'  => true, // do not show replies tweets
            'include_entities' => true, // do not show 
            'include_rts'      => true, // show retweets
            'trim_user'        => true // only show the status author numerical id
        ),
        array(
            'cache_duration' => '+30mins', // time of the cache
            'hashtag_class'  => 'pbtwitter-hashtag', // class of hashtag links
            'url_class'      => 'pbtwitter-url', // class of url links
            'user_class'     => 'pbtwitter-user' // class of user links
        )
    );
    ?>

Now we can create our Twitter MVC, so go ahead and create your Twitter model (app/Model/Twitter.php) : 

    <?php
    class Twitter extends AppModel{
        public $useTable = false; // we do not need a table in our Database
    }

Twitter controller (app/Controller/TwitterController.php) :

    <?php
    class TwitterController extends AppController{

        public function index(){
            App::import('Lib', 'PBTwitter'); // import the PBTwitter class from the Lib folder
            $Twitter = new PBTwitter(); // create a new instance of the class
                $d['tweets'] = $Twitter->find('prbaron', array('count' => 3)); // find the last 3 tweets
                    $this->set($d); // set the tweets to my view
        }
    }

Twitter view (app/Views/Twitter/index.ctp) :

    <ul>
        <?php foreach($tweets as $k => $v): ?>
            <?php debug($v); // show the array of the tweet ?>
            <li><?php echo $v['text']; ?></li>
        <?php endforeach; ?>
    </ul>

And that's all, now you can display your timeline to all your visitors. 

