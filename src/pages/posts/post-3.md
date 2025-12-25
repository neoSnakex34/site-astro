---
layout: ../../layouts/BlogPostLayout.astro
title: "What I've been up to, lately"
pubDate: 2025-12-24
description: 'my journey - so far - with linux immutables'
author: 'neoSnakex34'
image:
    url: '/blog/postImages/post-3.webp'
    alt: 'A screenshot of my desktop wallpaper.'
    credit: 'Me, but wallpaper is from projectbluefin'
    creditUrl: "/"
tags: ["immutability", "fedora silverblue", "ublue-os"]

---

---
## Distrohopping really kicked in 
### but how did it start?
I started my gnu/linux journey back in 2020, when I bough a mini pc I intended to use as a daily driver for university.
I hopped between countless distros, but the most relevant are:
- **Linux Mint mate** (feb 2020 - april 2020)
- **Fedora KDE** (april 2020 - more or less september 2021)
- **ArcoLinux BSPWM** (september 2021 - october 2021)
- **Arch i3-gaps** (october 2021 - april 2022)
- **EndeavourOS xfce** (april 2022 - 2023)
- **Arch i3-gaps** (2023 till december) 

### the ideapad era
then, in december 2023, I bought my current laptop which I'll refer to as ideapad from now on. <br>
The reason I picked up a new pc was I needed to use it for university projects, expecially the "web and software architecture" exam that required the students to bring a pc the day of the exam.
Since ideapad was intended for academic purposes I decided to go with something I could define stable enough for the task, and I installed **Fedora** in it's xfce spin. After passing the exam I started preparing for a cybersecurity one in which a laptop was mandatory too. Since I was really unhappy with the state of fedora in 2024 (I believed that the software choice was not enough compared to what one can achieve with AUR on arch based distros) I decided to install **Arch** keeping my xfce setup for simplicity. <br>
I love arch, but in the summer '24 I found myself in quite a pickle. A kernel level bug triggered an hardware specific issue in how ryzen 5xxx to 7xxx microcode handles c-states and my pc started cold rebooting from time to time. Even though some smart moderators and technician from the arch forum helped me (along with the others affected) in bisecting the issue and downgrading to a kernel that would not trigger it, I really lost faith in arch based distros as daily drivers. The freshness and availability of software started to be not enough to stay. 
In september I was convinced in trying **NixOS** which I absolutely _loved_. <br>
Imagine having a desktop declared in a series of config files that you can version with git and keep up-to-date in different machines. Ephemeral shells to try out stuff without messing with your underlying system and stuff like that. 
Since the really steep learning curve and the absolutely horrendous documentation of nix lang, I chose to keep it as simple as possible and I installed the GNOME desktop (on wayland, after the cyberecurity exam I get really paranoid about security concerns). Gnome is a desktop I find functional, simple and stunning, but I get all the drama surrounding it's development and mantainance... it's just I can't wrap my head around KDE anymore (who knows 👀) and I absolutely hate hyprland (so the only other viable choice on wayland would be sway that's usually my second choice in fact).

### you were just talking about distro hopping
#### what's the deal with all this nixing around? 
as I said, NixOS had become my home for a while. After some thinkering about the right way to configure it with Home Manager and Flakes I ended up with a nice workflow and I expanded the config to my workstation too. <br>
Throughout 2025 I used NixOS on every machine I own with the peace of mind of one that has a vast choice of software via nix package manager and the stability of an immutable-like reproducible desktop. 

### so why did you leave that bliss
Thing is that every adventurer eventually grows tired lying in bed, so, as a gnu/linux _connoisseur_, I started to feel that being too comfortable in a distro was not what i wanted.
#### that's the alibi, there is more
NixOS is _in fact_ great, and the unintentional immutability it gives is **by far** the best immutability paradigm I tried. 
But it's not all fun and games, NixOS come with serious downsides, one above all... it is not so popular. So, despite being way less elitistic than arch - that translates in a more kind community - when you use nixos you are basically on your own and if you face any issue you got to fix it yourself. 
#### the non POSIX-ness 
NixOS software is handled via the ```/nix/store```, which is non fhs-compliant (hence non POSIX-compliant) and that is a thing that one can say for probably every distro that adopt an atomic/immutable approach. The elephant in the room is that while "if it works with this nix config it will work everywhere" is absolutely true because of deterministic nature of pure functions it is also true that you either install nix everywere you need that thing to work or you make every person around you use NixOS or at least the nix package manager. 

--- 
### the snap
Preparing for - at this point, you got it - **an exam!** I was thinking about the fact that last time I took it, NixOS got in the way. Long story short, the teacher uses old debian machines to compile and test the software so unless I containerized all my work I would have to double check both in nixos and in a distrobox to be sure that my software actually compiled on teacher's machine. Because, you know, university does not always ship container images or vms for stuff like that... 

#### project bluefin 
I have to admit it, the selling point of the whole ublue-os thing was ALWAYS the incredibly good dinosaur artworks by [Jacob Schnurr](https://www.etsy.com/shop/JSchnurrCommissions?listing_id=1425657775) that Project Bluefin extensively use. <br>
So, curious about "raptors" and unwilling to drop atomic or immutable paradigm just yet