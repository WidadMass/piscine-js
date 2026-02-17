// Templates professionnels pour CV et lettres de motivation
export const CV_TEMPLATES = {
  moderne: {
    name: "CV Moderne",
    prompt: `Crée un CV moderne et professionnel avec cette structure :

**[NOM PRÉNOM]**
[Titre professionnel]
Email | Téléphone | LinkedIn | Ville

---

## EXPÉRIENCE PROFESSIONNELLE
[Poste] - [Entreprise] | [Dates]
• Réalisation 1 (quantifiée si possible)
• Réalisation 2
• Réalisation 3

---

## FORMATION
[Diplôme] - [Établissement] | [Année]
Spécialisation : [détails]

---

## COMPÉTENCES
**Techniques :** [liste]
**Langues :** [liste avec niveaux]
**Outils :** [liste]

---

## PROJETS & RÉALISATIONS
• [Projet remarquable avec impact mesurable]
• [Certification ou récompense]`
  },
  
  classique: {
    name: "CV Classique",
    prompt: `Crée un CV classique sobre et élégant avec cette structure :

[NOM ET PRÉNOM]
[Titre professionnel]
[Contact : email, téléphone, localisation]

═══════════════════════════════

PARCOURS PROFESSIONNEL
────────────────────────────
[Poste] | [Entreprise] | [Période]
→ Responsabilité principale
→ Réalisation clé avec résultat
→ Compétence développée

FORMATION ACADÉMIQUE
────────────────────────────
[Diplôme] | [Institution] | [Année]
Mention : [si applicable]

COMPÉTENCES CLÉS
────────────────────────────
• [Domaine 1] : [compétences]
• [Domaine 2] : [compétences]
• Langues : [niveaux]

INFORMATIONS COMPLÉMENTAIRES
────────────────────────────
• [Certifications, permis, mobilité, etc.]`
  },

  tech: {
    name: "CV Tech/IT",
    prompt: `Crée un CV optimisé pour le secteur Tech/IT :

# [PRÉNOM NOM]
## [Intitulé de poste - Ex: Full Stack Developer]

**Contact** : email@example.com | github.com/username | linkedin.com/in/username

---

### STACK TECHNIQUE
**Frontend :** React, Vue.js, TypeScript, Tailwind CSS
**Backend :** Node.js, Python, PostgreSQL, MongoDB
**DevOps :** Docker, AWS, CI/CD, Git
**Méthodologies :** Agile, TDD, Clean Code

---

### EXPÉRIENCE TECHNIQUE

**[Rôle]** @ [Entreprise] | *[Dates]*
- Développement de [projet] générant [impact quantifié]
- Stack : [technologies utilisées]
- Résultat : [métrique de succès]

---

### ÉDUCATION & CERTIFICATIONS
• [Diplôme] - [École] | [Année]
• [Certification professionnelle]

---

### PROJETS PERSONNELS
• **[Nom du projet]** : [Description courte + lien GitHub]
  Stack : [technologies] | Impact : [utilisateurs/stars/etc.]`
  },

  alternance: {
    name: "CV Alternance/Stage",
    prompt: `Crée un CV optimisé pour une recherche d'alternance ou de stage :

**[PRÉNOM NOM]**
Étudiant(e) en [Formation] - Recherche [Type de contrat]

email@example.com | 06 XX XX XX XX | LinkedIn

---

## OBJECTIF PROFESSIONNEL
[Phrase d'accroche personnalisée expliquant la recherche et les objectifs]

---

## FORMATION
**[Diplôme en cours]** | [École] | [Années]
→ Spécialisation : [domaine]
→ Projets académiques : [projet marquant]

**[Diplôme précédent]** | [Établissement] | [Année]

---

## EXPÉRIENCES PROFESSIONNELLES
**[Stage/Job étudiant]** | [Entreprise] | [Dates]
• Mission 1 : [description avec compétence développée]
• Mission 2 : [résultat obtenu]

---

## COMPÉTENCES & OUTILS
• **Techniques :** [compétences liées à la formation]
• **Logiciels :** [maîtrise des outils]
• **Soft skills :** [autonomie, travail d'équipe, etc.]
• **Langues :** Français (natif), Anglais ([niveau])

---

## ENGAGEMENTS & CENTRES D'INTÉRÊT
• [Association/Bénévolat] : [rôle et apport]
• [Passion pertinente pour le poste]`
  }
};

export const LETTRE_MOTIVATION_TEMPLATE = `Structure professionnelle pour une lettre de motivation :

**[Votre Prénom NOM]**
[Adresse]
[Téléphone] | [Email]

**[Entreprise]**
À l'attention de [Nom du recruteur si connu]
[Adresse entreprise]

**Objet : Candidature au poste de [Intitulé exact]**

[Ville], le [Date]

---

Madame, Monsieur,

**§1 - VOUS (L'entreprise)**
Actuellement [votre situation], j'ai été particulièrement intéressé(e) par [élément spécifique de l'entreprise/projet]. Votre [valeur/innovation/projet] correspond parfaitement à mes aspirations professionnelles.

**§2 - MOI (Vos compétences)**
Fort(e) de mon expérience en [domaine], j'ai développé des compétences en [compétence 1] et [compétence 2]. Lors de [expérience concrète], j'ai notamment [réalisation quantifiée], ce qui m'a permis de [résultat/apprentissage].

**§3 - NOUS (La rencontre)**
Ma maîtrise de [compétence clé du poste] ainsi que mon [qualité personnelle] me permettraient de contribuer efficacement à [objectif de l'entreprise]. Je suis convaincu(e) que mon profil correspondrait à vos attentes pour [projet/mission spécifique mentionné dans l'offre].

**§4 - CONCLUSION**
Je serais ravi(e) de vous rencontrer pour échanger sur ma candidature et vous démontrer ma motivation à rejoindre vos équipes.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Signature]
[Prénom NOM]`;

export function getSystemPromptForCV() {
  return `Tu es un Coach Carrière Senior et Expert en Recrutement. Ton objectif est de propulser la carrière de l'utilisateur.

**TES SUPER-POUVOIRS :**
1. **Expert CV** : Tu transformes des expériences banales en réussites impactantes (Verbes d'action, Chiffres, Mots-clés ATS).
2. **Coach d'Entretien** : Tu peux simuler des entretiens d'embauche. Pose une question difficile, attends la réponse, puis donne un feedback constructif.
3. **Optimiseur LinkedIn** : Tu donnes des conseils pour rendre un profil "chassable" par les recruteurs.
4. **Stratège** : Tu aides à négocier un salaire ou à décrypter une offre d'emploi.

**RÈGLES D'OR DE RÉDACTION :**
- **Quantifier** : "Géré un budget de 50k€" > "Géré un budget".
- **Action** : Utilise des verbes forts (Piloté, Initié, Conçu) au lieu de passifs.
- **Synthèse** : Sois concis et percutant.

**FORMAT DE SORTIE STRICT :**

1. **POUR LA CRÉATION DE CV (Action "Générer CV")** :
   - Tu DOIS répondre UNIQUEMENT avec un bloc de code JSON valide correspondant à la structure ci-dessous.
   - Ne mets AUCUN texte avant ou après le JSON.

2. **POUR TOUT LE RESTE (Conseils, Lettre, Entraînement)** :
   - Réponds en format texte Markdown normal, bien structuré.
   - Si l'utilisateur demande une Lettre de Motivation, structure-la en 4 parties : VOUS (L'entreprise) - MOI (Le candidat) - NOUS (La synergie) - CONCLUSION.

   Structure JSON OBLIGATOIRE pour le CV :
   \`\`\`json
   {
     "personalInfo": {
       "fullName": "Prénom Nom",
       "title": "Titre du poste visé",
       "email": "email@example.com",
       "phone": "06...",
       "location": "Ville",
       "links": ["LinkedIn", "Portfolio"]
     },
     "summary": "Résumé percutant de 3-4 lignes orienté résultats...",
     "experience": [
       {
         "role": "Intitulé du poste",
         "company": "Entreprise",
         "period": "Dates",
         "description": ["Réalisation majeure 1", "Réalisation 2"]
       }
     ],
     "education": [
       {
         "degree": "Diplôme",
         "school": "École",
         "year": "Année"
       }
     ],
     "skills": {
       "technical": ["Compétence 1", "Compétence 2"],
       "soft": ["Qualité 1", "Qualité 2"],
       "languages": ["Langue (Niveau)"]
     }, 
     "projects": [
         { 
             "name": "Nom du Projet",
             "description": "Description courte avec stack technique et impact" 
         }
     ]
   }
   \`\`\`

Réponds toujours avec bienveillance, professionnalisme et énergie. Tu es là pour faire gagner l'utilisateur.`;
}
