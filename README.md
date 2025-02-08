Este es el proceso de configuración del ambiente necesario para que funcione el backend de akaxa, se requiere Node en la versión referida en Package, la tiene el comando de insalacion usando nvm

| Package      | Version |
|--------------|---------|
| Node         | 18.19.1 |

El primer paso es instalar Node, siga las instrucciones al pie de la letra.

Instalar node 18.19.1
nvm install 18.19.1

Verificar instalacion
nvm ls

Instalar paquetes adicionales
npm install ts-node-dev@1.1.8 -g
npm install typescript@3.9.10 -g

Instalar paquetes
npm install

Ejecutar el backend
npm run dev

Nota: Revisar las variables de entorno para poder conectarse a la base de datos.