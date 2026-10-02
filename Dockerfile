# FASE 1: Construção
FROM node:22 AS builder  
WORKDIR /app  
COPY package*.json ./  
RUN npm ci  
COPY . .  
RUN npm run build  

# FASE 2: Produção (Leve e rápida)
FROM node:22-slim  

# Removi o apt-get install de bibliotecas gráficas e Puppeteer para manter a imagem da API enxuta.
# (Se o seu sistema de vagas for gerar relatórios em PDF usando Puppeteer no futuro, 
# cole aquele bloco RUN apt-get aqui novamente).

WORKDIR /app  

# Copia apenas o que importa da Fase 1 para a imagem final
COPY --from=builder /app/node_modules ./node_modules  
COPY --from=builder /app/dist ./dist  
COPY package*.json ./  

ENV NODE_ENV=production  
ENV TZ=America/Sao_Paulo  
EXPOSE 3000  

# Certifique-se de que o caminho do build bate com o gerado pelo seu tsc (pode ser dist/index.js também)
CMD ["node", "dist/main.js"]