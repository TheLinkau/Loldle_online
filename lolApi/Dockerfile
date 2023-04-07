ARG VERSION

# Dev image
FROM php:8.2.0-fpm-alpine 

ENV APP_ENV=prod

## Install system dependencies
RUN apk update && \
    apk add --no-cache --virtual dev-deps git autoconf gcc g++ make && \
    apk add --no-cache zlib-dev libzip-dev

## Install php extensions
RUN docker-php-ext-install pdo_mysql zip

## Copy php default configuration
# COPY ./docker/php-fpm/default.ini /usr/local/etc/php/conf.d/default.ini

WORKDIR /app

COPY composer.json composer.lock .

## Install composer
RUN wget https://getcomposer.org/installer && \
    php installer --install-dir=/usr/local/bin/ --filename=composer && \
    rm installer
#     && \
#    composer global require hirak/prestissimo

## Copy project files to workdir
COPY . .

## Remove dev dependencies
RUN composer install --no-dev --no-interaction --optimize-autoloader

## Change files owner to php-fpm default user
RUN chown -R www-data:www-data .

## Disable xdebug on production
# RUN rm /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

## Cleanup
RUN apk del dev-deps && \
    rm /usr/local/bin/composer

CMD ["php-fpm"]