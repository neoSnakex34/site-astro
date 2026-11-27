---
layout: ../../layouts/BlogPostLayout.astro
title: "All this cloud stuff got me acting unwise"
pubDate: 2026-11-27
description: 'taking my network topology to the next level, or descending into insanity I should say'
author: 'neoSnakex34'
image:
    url: '/blog/postImages/post-4.webp'
    alt: 'A photo of a cloud, pun intended with network clouds.'
    credit: 'Me'
    creditUrl: "/"
tags: ["Cloud Computing", "Network topology", "vpn"]

---

---
## Where do I start? 
People who know me, or the ones who may have read my previous posts, may recall I used to be primarily a web oriented developer. In the last year or so, since programming changed a lot, and since I did some occasional freelancing in a more serious fashion, I started to delve into cloud computing.

### I unintentionally stepped into DevSecOps world 
Being a freelancer in full-stack solutions means you are really full-stack. That
involves all the parts of the stack one does not usually associate with software
development. So I started to use cloud computing tools for deploying and
managing solutions, then some basic CI, then some raw data monitoring and
cleaning and so on and so forth. In these kinds of scenarios, if you do possess a
brain you also have a security mindset. _Ça va sans dire_, with security came a lot of responsibilities to take care of, from network security to operating systems all the way up to the application layer. 
Some of you [may remember that](/blog/post-3) virtualization, containers and reproducible environments were already something I loved and did on a daily basis.

## The turning point 
So after successfully landing a job as a full-stack dev, in my free time I
started studying various other topics spanning from data science to cloud
computing. After a while, I stumbled across a job opportunity as an Intern in
Data Science and AI and I applied. 

Some days after that I received a call from Accenture, telling me that given my background with cloud environments I would be a better fit for their Cloud Infrastructure Internship program.

## Fast-Forward from July to November 
Those months were absolutely intense, I had the opportunity to absorb a lot, and
I mean A LOT, of knowledge. I found myself working in hybrid cloud environments,
supporting big teams in coordinating infrastructure migrations and I had the
chance to reinforce and learn, both from manuals and hands-on, networking
fundamentals and cloud hyperscaler concepts. 

---

![a classic linux meme with a pun on cloud](/blog/inPostPic/cloud_meme.webp)
<figcaption>a classic linux meme (not my copyright)</figcaption>

---

### Who said theory is not important? 
Being an extremely curious individual, I always want to bridge the gaps between
topics, I always look for the bigger picture, so with cloud came networking,
with networking came security, and with security came operating systems. A
complex, yet wonderful, picture that describes the modern IT stack. There I
could finally find a real world use case for all the theory I've been studying
in these topics (cybersec especially) since 2024 when I took my Security exam. 

## Topology 
If you thought that algebraic topology wasn't scary enough, allow me to
introduce **network topology**. 
That is, if you cannot get it from the name, the physical and logical
arrangement of devices in a network. 
Working in intense production grade environments inspired me to level up my
personal network configurations hence I decided to start self-hosting services.
It all started with a tiny raspberry pi for music streaming through navidrome
container. 

---
![my primary lab](/blog/inPostPic/chopin.webp)
<figcaption>chopin: the alpha version of my primary lab (changing soon)</figcaption>

---
Then, all of a sudden I couldn't get enough of that incredible world. I started
segmenting my network into different VLANs, I delved into firewall rules and experimenting with mesh VPN
technologies and so on and so on, until I finally created a secondary - offsite
- node for the lab.

---
Introducing respighi: 
![respighi](/blog/inPostPic/respighi_clean.webp)
<figcaption>respighi: the secondary node for my primary lab</figcaption>

---
In case I didn't mention it, at the time of writing I am working as a Backup
Specialist, so it comes as no surprise I decided to use respighi as
a backup node for my navidrome instance.
But that is not all, respighi is also the beating heart of my Home Assistant
instance, tracking humidity spikes and running automations to keep my basement
monitored and dry. <br/>
Where respighi is located the network is divided into multiple VLANs, granting
least privilege access to different services and isolation where needed.
Moreover, the two lab nodes sit in a specific VPN subnet, securing them from
eavesdropping or lateral movement in the unfortunate event of a compromised
node.

## Conclusion 
This little update was intended to give a snapshot of my way of working even in hobby projects as well as showing that the blog is not dead yet and the site is in continuous development!

> "Not giving up is my magic!" 
>
>  -- Asta (from [Black Clover](https://it.wikipedia.org/wiki/Black_Clover))
