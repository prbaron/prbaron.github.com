---
layout   : post
category : tutoriel
tagline  : Créer un site avec Jekyll. Partie 5 - Finitions
keywords : jekyll, tutoriel, jekyll french, tuto jekyll fr
comments : true
demo     : http://pierrebaron.fr/tuto_jekyll/
download : https://github.com/prbaron/tuto_jekyll/releases/tag/chapitre5
---

Notre site est presque prêt, nous allons maintenant ajouter les dernières fonctionnalités pour qu'il soit complet.

  1. [Partie 1 - Introduction & Installation]({% post_url 2013-10-13-jekyll-site-part1 %})
  2. [Partie 2 - Création des pages]({% post_url 2013-10-13-jekyll-site-part2 %})
  3. [Partie 3 - Création du blog]({% post_url 2013-12-14-jekyll-site-part3 %})
  4. [Partie 4 - Gestion des catégories]({% post_url 2013-12-14-jekyll-site-part4 %})
  5. [Partie 5 - Finitions]({% post_url 2013-12-14-jekyll-site-part5 %})
  6. Partie 6 - Déploiement

## classe active sur menu


## Les commentaires
### Créer votre profil et site sur Disqus
Jekyll n'utilise pas de langage dynamique, nous ne pouvons donc utiliser de base de données ou de validation. Nous pouvons cependant utiliser un service tel que Disqus (gratuit).

La première chose à faire est de vous créer un compte sur le site : [https://disqus.com/profile/signup/](https://disqus.com/profile/signup/). Une fois que vous avez remplis les informations sur votre profil, il vous faut ajouter un site. Allez à l'adresse suivante : [http://disqus.com/admin/create/](http://disqus.com/admin/create/) et remplissez les champs nécessaires.

Vous pouvez modifier les préférences du site dans disque, notamment la langue d'affichage ou l'apparence de disqus une fois intégré à votre site.

### Ajouter le widget Disqus sur votre site

Allez sur le profil de votre site dans Disqus et naviguez dans **Settings** puis **Install** et enfin **Universal code**. Copiez le code dans le fichier **_includes/disqus.html**. Pour rendre notre application jekyll plus modulable, nous allons ajouter le profil dans le fichier de configuration :

{% highlight js linenos %}
{% raw %}

<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = '{{ site.disqus }}'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>


{% endraw %}
{% endhighlight %}

Maintenant, allez dans votre fichier **_config.yml** et ajoutez la ligne suivante :

{% highlight yaml linenos %}
{% raw %}

disqus : 'prbaron' # remplacez par votre shortName disqus

{% endraw %}
{% endhighlight %}

Il nous reste à intégrer cet élément aux articles. Si vous avez suivi les premiers chapitres, vous aurez compris qu'il faut éditer le fichier **_layouts/post.html**.

Comme toujours, pour appeler le fichier disqus, il s'agit de la commande include.

{% highlight html linenos %}
{% raw %}

{% include disqus.html %}

{% endraw %}
{% endhighlight %}

Et voila ! A partir de maintenant, vous allez pouvoir gérer vos commentaires depuis l'administration de Disqus, c'est très simple et très pratique. Un gain de temps assez important.

### Bonus : Activer/Désactiver les commentaires pour un article

IL est très simple de gérer l'activation/désactivation des commentaires pour un article précis. Il vous suffit d'ajouter une condition avant d'afficher

{% highlight html linenos %}
{% raw %}

{% if page.comments %}
    &nbsp;
    {% include disqus.html %}
{% endif %}

{% endraw %}
{% endhighlight %}

A partir de maintenant, vous gérer vos commentaires dans le front matter de chaque article avec

{% highlight yaml linenos %}
{% raw %}

---
comments : true
---

{% endraw %}
{% endhighlight %}

## Le formulaire de contact
Pour proposer à vos utilisateurs d'entre en contact avec vous, vous pouvez ajouter votre adresse email ou bien vos identifiants de réseaux sociaux. Cependant, cela peut vous déranger d'avoir une adresse mail en clair.

Nous allons aussi utiliser un service pour ajouter un formulaire de contact. [http://www.wufoo.com/](http://www.wufoo.com/) possède une formule gratuite qui nous suffit amplement.

Une fois votre profil créé, il vous faut ajouter un formulaire avec leur form builder. Maintenant que votre formulaire est créé, vous allez pouvoir l'intégrer à votre site web. Il vous faut cliquer sur **code** et choisir le type d'intégration.

Personnellement je préfère la version HTML/CSS code car elle me permet de gérer moi même le style de mon formulaire.


## Conclusion
Notre site est maintenant prêt ! Nous allons voir dans le dernier chapitre comment le mettre en ligne sur GitHub et ainsi disposer d'un hébergement geek et gratuit.