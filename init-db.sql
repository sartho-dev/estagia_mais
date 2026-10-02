-- Script de inicialização do banco de dados
-- Este arquivo será executado automaticamente pelo PostgreSQL quando o container iniciar

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar database se não existir (já é criado pelo POSTGRES_DB, mas deixamos por segurança)
-- SELECT 'CREATE DATABASE estagia_mais' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'estagia_mais')\gexec

-- Inicializar tabelas básicas ou dados seed podem ir aqui no futuro
