# Noodle

Noodle permite a los profesores de formación profesional analizar y procesar boletines oficiales de forma eficiente, extrayendo la información relevante sin pérdida de datos. Esto reduce de forma significativa el tiempo dedicado a la lectura y análisis manual de documentos oficiales, además de ofrecer mecanismos de integración con Moodle, una de las principales plataformas educativas. 

Set-up por la terminal:

git clone https://github.com/kasimxo/KaS-Noodle-Vercel.git

cd a cada directorio

En la carpeta client => npm start

En la carpeta server => npm run watch

Créditos:

Noodle utiliza pdf-parse para extraer el texto de los documentos pdf.

pdf-parse es un módulo creado por mehmet.kozan (puedes encontrar el módulo original aquí: https://www.npmjs.com/package/pdf-parse), pero en este proyecto se utiliza un fork creado (que nunca fue implementado :c ) por designly1.Este fork permite extraer el texto de cada una de las páginas por separado.