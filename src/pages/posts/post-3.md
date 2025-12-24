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
tags: ["astro", "blogging"]

---

## Distrohopping really kicked in 
After years of distrohopping, in which I used or just tried:
- **Linux Mint** (feb 2020 - april 2020)]
- **Fedora KDE** (april 2020 - more or less september 2021)
- **ArcoLinux BSPWM** (september 2021 - october 2021)
- **Arch i3-gaps** (october 2021 - april 2022)
- **EndeavourOS xfce** (april 2022 - 2023)
- **Arch i3-gaps** (2023 till december) 

### The ideapad era
then, in december 2023, I bought my current laptop which I'll refer to as ideapad from now on. <br>
The reason I picked up a new pc was I needed to use it for university projects, expecially the web and software architecture exam that required the students to bring a pc the day of the exam.
Since ideapad was intended for academic purposes I decided to go with something I could define stable enough for the task, and I installed **Fedora** in it's xfce spin. After passing the exam I started preparing for a cybersec exam which, also, required the students in bringing a laptop with them. Since I was really unhappy with the state of fedora in 2024 (I believed that the software choice was not enough compared to what one can achieve with AUR on arch based distros) I decided to install **Arch** keeping my xfce setup for simplicity. <br>
I love arch, but in the summer '24 I found myself in quite a pickle. A kernel level bug triggered an hardware specific issue in how ryzen 5xxx to 7xxx microcode handles pstate and my pc started cold rebooting from time to time. Even though some guys from the arch forum helped me and the others affected, in downgrading to a kernel that would not trigger the issue, I really lost faith in arch based distros, the freshness and availability of software started to be not enough to stay. 
In september I was convinced in trying **NixOS** which I absolutely _loved_. <br>
Imagine having a desktop declared in a series of config files that you can version with git and keep up-to-date in different machines. Ephemeral shells to try out stuff without messing with your underlying system and stuff like that. 
I've used NixOS for quite a while 