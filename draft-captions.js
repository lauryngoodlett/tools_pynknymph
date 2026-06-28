// Vercel Serverless Function — Pynk Nymph caption drafting
// Deploy: place this file at /api/draft-captions.js in your Vercel project.
// Set an environment variable in Vercel:  ANTHROPIC_API_KEY = sk-ant-...
// (Project Settings → Environment Variables. Never put the key in client code.)
//
// The browser POSTs { goal, angle, message } and gets back { captions: [..] }.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'Server missing ANTHROPIC_API_KEY' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const goal = (body && body.goal) || 'a post';
  const angle = (body && body.angle) || '';
  const message = (body && body.message) || '';

  const prompt =
    'You write Instagram captions for Pynk Nymph, a Richmond waxing studio. ' +
    'Voice: direct, warm, funny, unapologetic, body-positive, never spa-corporate. ' +
    'Post goal: ' + goal + '. Angle: ' + angle + '. ' +
    'The one thing we are saying: ' + (message || goal) + '. ' +
    'Write exactly 3 distinct caption options, each 1 to 3 short sentences, no hashtags. ' +
    'Return a numbered list, one caption per line.';

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!r.ok) {
      const txt = await r.text();
      res.status(502).json({ error: 'Upstream error', detail: txt });
      return;
    }

    const data = await r.json();
    const text = (data.content && data.content[0] && data.content[0].text) || '';
    const captions = text
      .split('\n')
      .map(function (l) {
        l = l.trim();
        // strip leading "1." / "2)" markers
        var i = 0;
        while (i < l.length && l[i] >= '0' && l[i] <= '9') i++;
        if (i > 0 && i < l.length && (l[i] === '.' || l[i] === ')')) i++;
        return l.slice(i).trim();
      })
      .filter(function (l) { return l.length > 1; })
      .slice(0, 3);

    res.status(200).json({ captions: captions.length ? captions : [text.trim()] });
  } catch (e) {
    res.status(500).json({ error: 'Request failed', detail: String(e) });
  }
}
