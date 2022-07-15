FROM node:16
LABEL mantainer="Vincenzo Palazzo vincenzopalazzodev@gmail.com"

# Ubuntu utils
RUN apt-get update && apt-get install -y \
    software-properties-common make bash

COPY . .

CMD ["./docker/entrypoint.sh"]