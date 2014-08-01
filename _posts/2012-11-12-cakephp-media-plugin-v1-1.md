---
layout   : post
category : plugin
tagline  : CakePHP Media plugin v1.1
note     : Grafikart updated its own version to 2.0. Mine is no longer updated.
keywords : cakephp, grafikart media plugin
comments : true
---

Today I want to share an awesome plugin created by [Grafikart](http://www.grafikart.fr/) called [CakePHP-Media](https://github.com/Grafikart/CakePHP-Media). You can download the v1.1 (improvements listed below) from my fork : [https://github.com/prbaron/CakePHP-Media](https://github.com/prbaron/CakePHP-Media)

## The plugin
The plugin adds a tinymce editor and a custom plugin in order to easily add images into your content. You can add/delete/ organise your images. You can choose an image as post image.

## version 1.1
The more I used it, the more functionalities I want to add. I discovered CKEditor and found that it better corresponds to my need than Tinymce. I also need to share other files than just images. The last thing I need is a cool plugin to add preformatted code to the content.

The original syntax highlight ckeditor plugin : [http://code.google.com/p/ckeditor-syntaxhighlight/](http://code.google.com/p/ckeditor-syntaxhighlight/).

Here are the new files you can add into the editor :&nbsp;

  * Image : jpg, gif, png
  * Video : avi, mov, mkv, mp4, wmv
  * Music : mp3, wma,
  * Zip : rar, tar.gr, tgz, zip

If you upload images, the behaviour of the plugin does not change. If you upload video or music, you can either choose to embed tag (&lt;video&gt;, &lt;audio&gt;) or to create a link to download the file. Finally, if you upload zip files, you can add a link.

The upload file limit is limited to 50mb. It can not be enough for video files. If you want to increase this limit, you have to change the value of

{% highlight php  linenos=table %}
{% raw %}

max_file_size : '50mb',

{% endraw %}
{% endhighlight %}

in _app/Plugin/Media/View/Medias/admin_index.ctp. You can also have to change it in your core php.ini of your webserver.

## Tutorial

[Grafikart made a tutorial video of the v1.0 of his plugin](http://www.grafikart.fr/tutoriels/cakephp/medias-plugin-301) (video in French).


### Add a ckeditor editor

Grafikart created a Helper to add a Tinymce editor. If you follow the tutorial, you have to add this line :

{% highlight php  linenos=table %}
{% raw %}

<?php echo $this->Uploader->tinymce('content'); ?>

{% endraw %}
{% endhighlight %}

I created a helper for CKEditor and you can call it like this :

{% highlight php  linenos=table %}
{% raw %}

<?php echo $this->Uploader->ckeditor('content'); ?>

{% endraw %}
{% endhighlight %}