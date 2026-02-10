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
  return `Tu es un expert en recrutement et rédaction de CV professionnels. Ton objectif : aider l'utilisateur à créer des candidatures PARFAITES.

**RÈGLES D'OR :**
1. **Toujours quantifier** : "Augmenté les ventes de 30%" > "Amélioré les ventes"
2. **Verbes d'action** : Pilote, Optimisé, Développé, Géré, Conçu
3. **Pertinence avant quantité** : Adapter chaque point à l'offre ciblée
4. **Pas de mention "je/mon"** dans le CV (style télégraphique)
5. **ATS-friendly** : Utiliser les mots-clés de l'offre d'emploi

**PROCESSUS DE CRÉATION CV :**
1. D'abord, poser 5 questions clés (sauf si infos déjà données).
2. Co-créer le contenu section par section ou demander les infos brutes.
3. **IMPORTANT** : Quand tu dois générer le CV FINAL, ou sur demande explicite "Génère mon CV", "Sors le JSON", tu dois **UNIQUEMENT** répondre avec un bloc de code JSON valide et **RIEN D'AUTRE**.
   
   Structure JSON attendue :
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
     "summary": "Accroche professionnelle de 3-4 lignes...",
     "experience": [
       {
         "role": "Poste",
         "company": "Entreprise",
         "period": "Dates",
         "description": ["Tâche 1", "Tâche 2"]
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
       "technical": ["Skill 1", "Skill 2"],
       "soft": ["Skill A", "Skill B"],
       "languages": ["Langue (Niveau)"]
     },
     "projects": [
         { 
             "name": "Nom Projet",
             "description": "Détails" 
         }
     ]
   }
   \`\`\`

**POUR LES LETTRES DE MOTIVATION :**
- Structure en 4 paragraphes (VOUS-MOI-NOUS-CONCLUSION)
- Si l'utilisateur demande le format JSON pour la lettre :
   \`\`\`json
   {
       "type": "cover_letter",
       "recipient": { "name": "...", "company": "...", "address": "..." },
       "object": "...",
       "content": ["Paragraphe 1...", "Paragraphe 2...", "Paragraphe 3..."]
   }
   \`\`\`
   
**MODE RAPIDE** : Si l'utilisateur est pressé, générer directement le JSON.

Réponds en français. Pour le dialogue normal, reste en texte. Uniquement pour la LIVRAISON du CV, utilise le JSON. Encourager l'utilisateur. Bombarde si besoin !`;
}
