import { NextResponse } from 'next/server';
import { CV_TEMPLATES, LETTRE_MOTIVATION_TEMPLATE } from '../../../backend/services/cvTemplates';

// GET: Récupérer les templates disponibles
export async function GET() {
  return NextResponse.json({
    cvTemplates: Object.entries(CV_TEMPLATES).map(([key, template]) => ({
      id: key,
      name: template.name,
      preview: template.prompt.substring(0, 200) + '...'
    })),
    lettreMotivation: {
      preview: LETTRE_MOTIVATION_TEMPLATE.substring(0, 200) + '...'
    }
  });
}

// POST: Obtenir un template complet
export async function POST(request) {
  try {
    const { templateId, type } = await request.json();

    if (type === 'cv' && CV_TEMPLATES[templateId]) {
      return NextResponse.json({
        template: CV_TEMPLATES[templateId].prompt
      });
    }

    if (type === 'lettre') {
      return NextResponse.json({
        template: LETTRE_MOTIVATION_TEMPLATE
      });
    }

    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
