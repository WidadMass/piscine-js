// Comparer Node.js et le Navigateur Web
// Objectif général
// Comprendre les différences fondamentales entre :

// Node.js (environnement d’exécution côté serveur)
// le navigateur web (environnement d’exécution côté client)
// Rappel (à lire avant l’exercice)
// JavaScript peut s’exécuter :

// dans le navigateur (côté client)
// dans Node.js (côté serveur)
// Même langage, environnements différents.

// Consignes générales
// Pour chaque tableau :

// Complétez les cases en indiquant où la fonctionnalité est disponible
// Utilisez ✔ / ✖ ou des phrases courtes
// Justifiez au moins une réponse par tableau
// Tableau 1 – Environnement d’exécution
// Énoncé
// Indiquez les caractéristiques propres à Node.js, au navigateur, ou aux deux.

// Critère	Node.js	Navigateur
// Exécute JavaScript		
// Côté serveur		
// Côté client		
// Accès au DOM		
// Accès au système de fichiers		
// Accès au réseau bas niveau		
// Tableau 2 – APIs disponibles
// Énoncé
// Indiquez quelles APIs sont disponibles dans chaque environnement.

// API / Fonctionnalité	Node.js	Navigateur
// DOM		
// fs (file system)		
// http		
// fetch		
// localStorage		
// process		
// Tableau 3 – Sécurité et contraintes
// Énoncé
// Comparez les contraintes de sécurité.

// Critère	Node.js	Navigateur
// Accès disque libre		
// Sandbox de sécurité		
// Accès matériel		
// Isolation du code		
// Tableau 4 – Cas d’usage
// Énoncé
// Associez chaque cas d’usage à l’environnement le plus adapté.

// Cas d’usage	Node.js	Navigateur
// API backend		
// Interface utilisateur		
// Traitement de fichiers		
// Validation de formulaire		
// Temps réel (WebSocket)		
// Tableau 5 – Performance et exécution
// Énoncé
// Comparez le comportement à l’exécution.

// Critère	Node.js	Navigateur
// Event Loop		
// Multithreading		
// Longs calculs		
// Interaction utilisateur		
// Question de synthèse (obligatoire)
// Expliquez en 5 lignes maximum :

// Pourquoi JavaScript se comporte-t-il différemment dans Node.js et dans le navigateur ?

// Phrase de conclusion attendue
// “Node.js et le navigateur utilisent JavaScript,
//  mais n’offrent pas les mêmes capacités ni les mêmes responsabilités.”
//  Solutions
// Tableau 1 – Environnement d’exécution
// Critère	                    Node.js	                    Navigateur
// Exécute JavaScript	        ✔	                        ✔
// Côté serveur	                ✔	                        ✖
// Côté client	                ✖	                        ✔
// Accès au DOM	                ✖	                        ✔
// Accès au système de fichiers	✔	                        ✖
// Accès au réseau bas niveau	    ✔	                        ✖
// Justification : Node.js est conçu pour le développement côté serveur, 
// offrant un accès au système de fichiers et aux réseaux bas niveau, 
// tandis que le navigateur est destiné à l’interaction utilisateur et à la manipulation du DOM.
// Tableau 2 – APIs disponibles
// API / Fonctionnalité	                Node.js	                Navigateur
// DOM	                                 ✖	                        ✔
// fs (file system)	                     ✔	                         ✖
// http	                                 ✔	                         ✖
// fetch	                             ✔	                         ✔
// localStorage	                         ✖	                        ✔
// process	                             ✔	                         ✖
// Justification : Certaines APIs comme fs et process sont spécifiques à Node.js, 
// tandis que le DOM et localStorage sont propres aux navigateurs.
// Tableau 3 – Sécurité et contraintes
// Critère	                            Node.js	                    Navigateur
// Accès disque libre	                ✔	                        ✖
// Sandbox de sécurité	                ✖	                        ✔
// Accès matériel	                    ✔	                        ✖
// Isolation du code	                    ✖	                        ✔
// Justification : Les navigateurs imposent des restrictions de sécurité strictes pour protéger l’utilisateur,
// * tandis que Node.js offre plus de liberté d’accès aux ressources système.
// Tableau 4 – Cas d’usage
// Cas d’usage	                    Node.js	                    Navigateur
// API backend	                        ✔	                        ✖
// Interface utilisateur	                ✖	                        ✔
// Traitement de fichiers	            ✔	                        ✖
// Validation de formulaire	            ✖	                        ✔
// Temps réel (WebSocket)	            ✔	                        ✔
// Justification : Node.js est idéal pour les tâches serveur comme les API et le traitement de fichiers,
//  tandis que le navigateur excelle dans l’interface utilisateur et la validation côté client.
// Tableau 5 – Performance et exécution
// Critère	                            Node.js	                    Navigateur
// Event Loop	                        ✔	                        ✔
// Multithreading	                    ✖	                        ✖
// Longs calculs	                    ✖	                        ✖
// Interaction utilisateur	            ✖	                        ✔
// Justification : Les deux environnements utilisent une boucle d’événements pour gérer
//  les opérations asynchrones, mais le navigateur est optimisé pour l’interaction utilisateur.
// Question de synthèse
// Node.js et le navigateur partagent le même langage, JavaScript, mais sont conçus pour des contextes différents. Node.js est orienté vers le développement côté serveur, offrant un accès direct aux ressources système et aux réseaux, tandis que le navigateur se concentre sur l’interaction utilisateur et la manipulation du DOM. Cette distinction entraîne des différences significatives dans les APIs disponibles, les contraintes de sécurité et les cas d’usage typiques. Ainsi, bien que le langage soit identique, les environnements d’exécution influencent fortement le comportement et les capacités de JavaScript.  
// Phrase de conclusion
// “Node.js et le navigateur utilisent JavaScript, mais n’offrent pas les mêmes capacités ni les mêmes responsabilités.”    