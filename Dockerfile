# Use the official Node.js 16 image as the base
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm install -g npm@9.6.6

RUN apt-get update && apt-get install -y libnss3 && apt-get install -y libatk1.0-0 && \
     apt-get install -y libatk-bridge2.0-0 && apt-get install -y libcups2 && apt-get install -y libdrm2 && \
     apt-get install -y libgtk-3-0  && apt-get install -y libgbm1 && apt-get install -y libasound2


# Install the dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .


# RUN useradd -ms /bin/bash myuser

# RUN chown root:root /home/myuser/.npm/_npx/1323dbbc85759269/node_modules/electron/dist/chrome-sandbox

# RUN chmod 4755 /home/myuser/.npm/_npx/1323dbbc85759269/node_modules/electron/dist/chrome-sandbox

# USER myuser

# RUN chmod 777 ./script.sh         npm i -g electron@24.2.0

# Set the environment variable to run the app in production mode
ENV NODE_ENV production

# Start the app
# CMD ["npm", "start"]

CMD ["tail", "-f", "/dev/null"]