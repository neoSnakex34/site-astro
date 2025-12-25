---
layout: ../../layouts/BlogPostLayout.astro
title: "What I've been up to, lately"
pubDate: 2025-12-25
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
I started my gnu/linux journey back in 2020, when I bought a mini pc I intended to use as a daily driver for university.
During those years, I hopped between countless distros, but the most relevant are:\
written as \
[distro - desktop environment/window manager]
- **Linux Mint mate** (feb 2020 - april 2020)
- **Fedora KDE** (april 2020 - more or less september 2021)
- **ArcoLinux BSPWM** (september 2021 - october 2021)
- **Arch i3-gaps** (october 2021 - april 2022)
- **EndeavourOS xfce** (april 2022 - 2023)
- **Arch i3-gaps** (2023 till december) 

### the ideapad era
Then, in december 2023, I bought my current laptop which I'll refer to as ideapad from now on. <br>
The reason I picked up a new pc was I needed to use it for university projects, expecially the "web and software architecture" exam that required the students to bring a pc the day of the exam.
Since ideapad was intended for academic purposes I decided to go with something I could define stable enough for the task, and I installed **Fedora** in it's xfce spin. After passing the exam I started preparing for a cybersecurity one in which a laptop was mandatory too. Since I was really unhappy with the state of fedora in 2024 (I believed that the software choice was not enough compared to what one can achieve with AUR on arch based distros) I decided to install **Arch** keeping a similar xfce setup for the sake of simplicity. <br>
I love arch, but in the summer '24 I found myself in quite a pickle. A kernel level bug triggered an hardware specific issue in how ryzen 5xxx to 7xxx microcode handles c-states and my pc started cold rebooting from time to time. Even though some smart moderators and technician from the arch forum helped me (along with the others affected) in bisecting the issue and downgrading to a kernel that would not trigger it, I really lost faith in arch based distros as daily drivers. The freshness and availability of software started to be not enough to stay. 
In september I was convinced in trying **NixOS** which I absolutely _loved_. <br>
Imagine having a desktop declared in a series of config files that you can version with git and keep up-to-date in different machines. Ephemeral shells to try out stuff without messing with your underlying system and stuff like that. 
Since the really steep learning curve and the absolutely horrendous documentation of nix lang, I chose to keep it as simple as possible and I installed the GNOME desktop (on wayland, after the cyberecurity exam I get really paranoid about security concerns). Gnome is a desktop I find functional, simple and stunning, but I get all the drama surrounding it's development and mantainance... it's just I can't wrap my head around KDE anymore (who knows 👀) and I absolutely dislike the style of hyprland (so the only other viable choice on wayland would be sway that's usually my second choice in fact).

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
NixOS software is handled via the ```/nix/store```, which is non fhs-compliant (making nixos non POSIX-compliant) and that is a thing that one can say for probably every distro that adopt an atomic/immutable approach. The elephant in the room is that while "if it works with this nix config it will work everywhere" is true because of the deterministic nature of pure functions - which is the fundamental idea behind nix - it is also true that you either install nix everywere you need that thing to work with or ensure every person around you use NixOS or at least the nix package manager... to fully benefit from reproducibility **you will need** ease of use.

--- 
### the snap
Preparing for - at this point, you got it - **an exam!** I was thinking about the fact that last time I took it, NixOS got in the way. Long story short, the teacher uses old debian machines to compile and test the software so unless I containerized all my work I would have to double check both in nixos and in a distrobox to be sure that my software actually compiled on teacher's machine. Because, you know, university does not always ship container images or vms for stuff like that. Binaries compiled on containers won't run directly on nixos so i had to compile multiple instances and check in and out of my host system to make sure I was doing things right. 

#### project bluefin 
I have to admit it, the selling point of the whole ublue-os thing was ALWAYS the incredibly good dinosaur artworks by [Jacob Schnurr](https://www.etsy.com/shop/JSchnurrCommissions?listing_id=1425657775) that Project Bluefin extensively use. <br>
So, curious about "raptors" and unwilling to drop atomic or immutable paradigm just yet, back in November I installed bluefin on my main workstation, to give it a chance. 
The first approach was not that easy, being used to declare everything into a config file and ```nixos-rebuild switch``` to it, returning to a non declarative system felt like a downgrade in the first place. Things got better when I started to adopt the mindset intended from ublue-os team: full containerized workflow.

#### devcontainers, my beloved
Exstensively using flatpak and other user-space centric approach to applications, like ```brew``` and ```distrobox``` I started to benefit from something I always avoided doing in NixOS, creating isolated workspaces to develop (and that's my fault, indeed). I am fully aware that nixos would've let me do the same with most likely a higher level of reproducibility, the thing is that - as I mentioned before - ease of use _is_ important.  
Creating custom devcontainers for my environment I managed to reproduce a suitable environment for my software engineering exam, having debian bookwork with all the build related tools and an installation of helix editor with it's own tailored configuration I can use when needed just spinning up a ```devcontainer exec bash```.

### is it about fedora, bluefin, or development approach?
What changed in me was fundamentally the paradigm adopted in handling my system. Everyone can achieve this kind of workflow in almost every stable enough distro, without it being atomic. For instance, one could use ```toolbox```, ```brew```, ```devcontainer``` and ```podman``` directly on a debian stable, prioritizing flatpak first approach and reducing to the bare minimum the installation of ```apt``` packages. Again, this kind of approach is even better in NixOS, where you can decide to use ```devenv``` and declare specific dev environments via flakes. What really made me switch 
was the loving and exstensive community behind fedora atomic and, in particular, ublue-os. While cloud native approach can be considered too opinionated (as in too dogmatic) I believe that it's container-first approach is kinda useful and fun too. 

#### my current setup
Project Bluefin is great, but I still like minimalism and to KISS (keep it stupid simple). So I decided to go for vanilla fedora silverblue on my laptop (that would've struggled with the higher RAM usage of all the bluefin qol pre-installed). \
On plain silverblue I downloaded the raptor artwork from bluefin and configured the day to night wallpaper switch on gnome ('cause it's goated) then I installed all the cli stuff via ```brew``` as I would on bluefin. I use devcontainers via podman and everything else is a flatpak. What I got is a simple, clean, stable and minimalistic desktop which I absolutely love.

### conclusions 
Immutable paradigm could really be the future of linux desktop, as of today the only distro I'd like to use are NixOS, Fedora Atomic Based or Debian (with this container-first style).

> "If you're not failing every now and again, it's a sign you're not doing anything very innovative." 
>
>  -- Woody Allen