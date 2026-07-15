# TalleFinal-Devops
# Despliegue de Aplicación Web en VPS con Docker, Traefik y CI/CD

Este repositorio contiene la configuración, infraestructura y código para el despliegue automatizado de la aplicación **Yumbo** en un Servidor Privado Virtual (VPS). El proyecto se ha estructurado completamente utilizando contenedores Docker, gestionados por un proxy inverso (Traefik) para el enrutamiento seguro mediante subdominios SSL.

---

## Integrantes del Grupo
*   **Ariel Meneses** *y* **Luis Yumbo**

---

## URLs de los Servicios Publicados

Todos los servicios están operativos y accesibles públicamente a través de los siguientes enlaces:

| Servicio | URL Pública | Descripción |
| :--- | :--- | :--- |
| **Frontend (Angular)** | [https://yumbo.byronrm.com](https://yumbo.byronrm.com) | Aplicación cliente para los usuarios. |
| **Backend (Laravel)** | [https://backyumbo.byronrm.com](https://backyumbo.byronrm.com) | API REST que procesa la lógica de negocio. |
| **Portainer** | [https://portaineryumbo.byronrm.com](https://portaineryumbo.byronrm.com) | Panel de administración y orquestación de Docker. |
| **Administrador de BD (pgAdmin/Adminer)** | [https://portaineryumbo.byronrm.com](https://portaineryumbo.byronrm.com) | Interfaz gráfica para gestionar la base de datos PostgreSQL. |

---

## 🗺️ Diagrama de Arquitectura de la Solución

```text
                     [ Petición del Cliente ]
                                │
                                ▼
                       [ Puerto 80 / 443 ]
                                │
                                ▼
                        ┌──────────────┐
                        │   TRAEFIK    │  <--- (Genera certificados SSL automáticos)
                        └──────┬───────┘
                               │
         ┌─────────────────────┼─────────────────────┬─────────────────────┐
         │ (yumbo.*)           │ (backyumbo.*)       │ (portaineryumbo.*)  │ (dbadminyumbo.*)
         ▼                     ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    Frontend     │   │     Backend     │   │    Portainer    │   │  DB Admin/pgAdmin│
│    (Angular)    │   │    (Laravel)    │   │  (Docker mgt)   │   │  (Gestión BD)   │
└─────────────────┘   └────────┬────────┘   └─────────────────┘   └────────┬────────┘
                               │                                           │
                               │  (Red Interna Docker: 'web')              │
                               ▼                                           ▼
                      ┌─────────────────┐                                  │
                      │  Base de Datos  │ <────────────────────────────────┘
                      │  (PostgreSQL)   │
                      └─────────────────┘
