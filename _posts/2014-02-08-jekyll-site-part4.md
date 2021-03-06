---
layout   : post
menu     : Blog
category : tutoriel
tagline  : Créer un site avec Jekyll. Partie 4 - Les catégories
keywords : jekyll, tutoriel, jekyll french, tuto jekyll fr
demo     : http://pierrebaron.fr/tuto_blog_jekyll/
download : https://github.com/prbaron/tuto_blog_jekyll/tree/chapitre4
---

Nous avons pu voir, dans le chapitre 3, comment créer notre blog avec Jekyll. Cependant, celui ci est encore basique car il ne possède pas de catégorie ou de système de commentaires (nous règlerons ceci dans le chapitre 5).

  1. [Partie 1 - Introduction & Installation]({% post_url 2013-10-13-jekyll-site-part1 %})
  2. [Partie 2 - Création des pages]({% post_url 2013-10-13-jekyll-site-part2 %})
  3. [Partie 3 - Création du blog]({% post_url 2013-12-14-jekyll-site-part3 %})
  4. [Partie 4 - Gestion des catégories]({% post_url 2014-02-08-jekyll-site-part4 %})
  5. [Partie 5 - Finitions]({% post_url 2014-02-08-jekyll-site-part5 %})
  6. [Partie 6 - Déploiement]({% post_url 2014-02-23-jekyll-site-part6 %})

## Ajout de la catégorie dans le front matter

Nous avons déjà les informations minimales à ajouter au front matter d'un article markdown pour qu'il soit correctement compris comme faisant parti du blog. Nous allons maintenant y ajouter une propriété indiquant le nom de la catégorie.

{% highlight yaml linenos=table %}
{% raw %}
---
layout: post
title:  "Post un"
category : one
---
{% endraw %}
{% endhighlight %}

Vous pouvez, bien sûr, entrer n'importe quel nom (exemple : Computer, ma longue catégorie, ...);


## Lister les catégories

Le principe va être d'afficher la liste de toutes les catégories du site et d'afficher la liste de tous les articles pour une catégorie.

Créez un nouveau fichier **_includes/categories.html** et copiez y le code suivant.

{% highlight html linenos=table %}
{% raw %}
<h2>Catégories</h2>
{% for category in site.categories %}
    <li><a href="{{site.url}}/categories/{{ category[0] }}.html">{{ category[0] }}</a></li>
{% endfor %}
{% endraw %}
{% endhighlight %}

Ce bout de code permet de créer une liste de liens affichant toutes les catégories présentes dans votre blog. Contrairement à des CMS avec des langages dynamiques, Jekyll ne permet pas de générer automatiquement les pages de catégories (Sauf avec un plugin Jekyll mais ce n'est pas l'objectif de ce tutoriel).

Il va donc falloir créer un dossier **categories** à la racine de votre projet Jekyll. Vous allez devoir créer manuellement un fichier par catégorie que vous décidez d'ajouter à vos articles. Le nom du fichier doit être le nom de la catégorie (exemple : one.html). Le seul élément à modifier est le title contenu dans le front matter.

{% highlight yaml linenos=table %}
{% raw %}
---
layout: default
title: one
---

{% include category.html %}
{% endraw %}
{% endhighlight %}

## Lister les articles par catégorie
Dans la section précédente, nous faisons un appel à un élément contenu dans le dossier **_includes** mais nous n'avons pas créé ce dernier. Créez le fichier **_includes/category.html**, et copiez y le code suivant :

{% highlight html linenos=table %}
{% raw %}
{% for post in site.categories[page.title]  %}
<div>
    <h3>{{ post.title }} <small>{{post.date | date_to_string }}</small></h3>
    <p>{{post.excerpt}}</p>
    <p><a href="{{site.url}}{{post.url}}" class="btn btn-default">Lire plus</a></p>
</div>
<hr>
{% endfor %}
{% endraw %}
{% endhighlight %}

Ce bout de code permet de lister tous les articles relatif à la catégorie choisie. Il n'y a pas de pagination. Il ne faut pas oublier que Jekyll est un générateur statique et possède donc moins de fonctionnalités qu'un CMS dynamique.


## Afficher la liste des catégories sur le site

Nous avons la liste des catégories, la liste des articles par catégories, maintenant, il nous faut relier le tout et afficher l
Maintenant, il faut ajouter cet élément dans le layout relatif aux articles. Editez le fichier **_layout/post.html**.

{% highlight html linenos=table %}
{% raw %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{{ page.title }}</title>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="{{site.url}}/css/bootstrap.min.css">
</head>
<body>
    {% include menu.html %}

    <div class="container">

        <div class="row">
            <div class="col-md-8">
                <h1>{{ page.title }} <small>{{ page.date | date_to_string }}</small></h1>
                {{ content }}

                <ul class="pager">
                    {% if page.previous %}
                        <li class="previous"><a href="{{site.url}}{{ page.previous.url }}">&larr; {{ page.previous.title }} </a></li>
                    {% endif %}
                    {% if page.next %}
                        <li class="next"><a href="{{site.url}}{{ page.next.url }}">{{ page.next.title }} &rarr;</a></li>
                    {% endif %}
                </ul>
            </div>
            <div class="col-md-4">
                {% include categories.html %}
            </div>
        </div>

        {% include footer.html %}
    </div> <!-- /container -->

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="{{site.url}}/js/bootstrap.min.js"></script>
</body>
</html>
{% endraw %}
{% endhighlight %}

## Conclusion

Cette partie nous a permis de voir la gestion des catégories. Celle ci est beaucoup plus manuelle que pour les autres CMS, mais elle ne demande pas vraiment d'effort et, à ce stade du tutoriel, vous avez sûrement compris le code très facilement.

Dans le prochain chapitre, nous verrons comment ajouter les commentaires, et les fonctionnalités finales pour avoir un site parfait.
