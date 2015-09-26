FROM debian:jessie
MAINTAINER Oncast <luiz.simples@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN echo "" >> /etc/bash.bashrc
RUN echo "# enable bash completion in interactive shells" >> /etc/bash.bashrc
RUN echo "if ! shopt -oq posix; then" >> /etc/bash.bashrc
RUN echo "  if [ -f /usr/share/bash-completion/bash_completion ]; then" >> /etc/bash.bashrc
RUN echo "    . /usr/share/bash-completion/bash_completion" >> /etc/bash.bashrc
RUN echo "  elif [ -f /etc/bash_completion ]; then" >> /etc/bash.bashrc
RUN echo "    . /etc/bash_completion" >> /etc/bash.bashrc
RUN echo "  fi" >> /etc/bash.bashrc
RUN echo "fi" >> /etc/bash.bashrc
RUN echo "" >> /etc/bash.bashrc

RUN echo "America/Sao_Paulo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
RUN apt-get update
RUN apt-get install -qqy --force-yes apt-utils htop
RUN apt-get upgrade -qqy --force-yes

RUN echo "LANGUAGE=pt_BR.UTF-8" >> /etc/environment
RUN echo "LANG=pt_BR.UTF-8" >> /etc/environment
RUN echo "LC_ALL=pt_BR.UTF-8" >> /etc/environment

RUN apt-get install -qqy --force-yes locales
RUN locale-gen pt_BR.UTF-8
RUN dpkg-reconfigure locales

RUN apt-get install -qqy --force-yes sudo libfontconfig1 bzip2 build-essential python-software-properties vim git curl
RUN apt-get autoremove -qqy --force-yes
RUN apt-get autoclean  -qqy --force-yes
RUN apt-get clean

ENV NODE_VERSION 0.12.7

RUN set -x \
  && gpg --keyserver pool.sks-keyservers.net --recv-keys 7937DFD2AB06298B2293C3187D33FF9D0246406D 114F43EE0176B71C7BC219DD50A3051F888C628D

RUN set -x \
 && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
 && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
 && gpg --verify SHASUMS256.txt.asc \
 && grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
 && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
 && rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc \
 && apt-get purge -qqy --auto-remove

RUN npm install -g gulp mocha bower
RUN npm cache clear

#Http port
EXPOSE 1337

#Socket port
EXPOSE 1338

# Install Java.
#RUN \
#    echo "===> add webupd8 repository..."  && \
#    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee /etc/apt/sources.list.d/webupd8team-java.list  && \
#    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list  && \
#    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886  && \
#    apt-get update  && \
#    \
#    \
#    echo "===> install Java"  && \
#    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections  && \
#    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections  && \
#    DEBIAN_FRONTEND=noninteractive  apt-get install -y --force-yes oracle-java8-installer oracle-java8-set-default
#ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

RUN apt-get autoremove
RUN apt-get autoclean
RUN apt-get clean
RUN apt-get update

RUN echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    useradd -u 5001 -G users,sudo -d /dojo --shell /bin/bash -m dojo && \
    echo "secret\nsecret" | passwd dojo

RUN usermod -u 1000 dojo

USER dojo

WORKDIR /dojo

CMD [ "bash" ]
