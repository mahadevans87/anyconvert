FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

RUN apt-get update
RUN apt-get install libreoffice -y
RUN apt-get install unoconv -y

# Copy local code to the container image.
COPY . .

EXPOSE 3000
EXPOSE 9229
# Run the web service on container startup.
CMD [ "npm", "start" ]
