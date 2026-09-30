import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

type ResultEmailInput = {
  to: string;
  candidateName: string;
  score: number;
  total: number;
  percentage: number;
  result: 'pass' | 'fail';
  passPercentage: number;
};

// One point of truth for the result email — called right after scoring in /api/submit
export async function sendResultEmail(input: ResultEmailInput) {
  const { to, candidateName, score, total, percentage, result, passPercentage } = input;

  if (!process.env.RESEND_API_KEY) {
    // No Resend key yet — don't fail the flow, just show what would have been sent
    console.log(
      `[mock email] To: ${to} | ${candidateName} scored ${score}/${total} (${percentage}%) → ${result.toUpperCase()} (pass mark ${passPercentage}%)`
    );
    return true;
  }

  const statusColor = result === 'pass' ? '#1E8E5A' : '#C0392B';
  const statusLabel = result === 'pass' ? 'PASSED' : 'NOT CLEARED';

  const html = `
  <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; color:#1F1B24;">
    <p style="color:#C77B1F; font-size:13px; font-weight:600; letter-spacing:0.02em; margin-bottom:4px;">
      Telth Care Manager Recruitment
    </p>
    <h2 style="color:#3E1D61; margin-top:0;">Your Assessment Result</h2>
    <p>Hi ${candidateName || 'Candidate'},</p>
    <p>Thank you for completing the Care Manager online recruitment assessment. Here is your result for the objective section:</p>

    <table style="width:100%; border-collapse:collapse; margin:20px 0;">
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #eee;">Score</td>
        <td style="padding:10px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${score} / ${total}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #eee;">Percentage</td>
        <td style="padding:10px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${percentage}%</td>
      </tr>
      <tr>
        <td style="padding:10px 0;">Pass mark</td>
        <td style="padding:10px 0; text-align:right;">${passPercentage}%</td>
      </tr>
    </table>

    <p style="display:inline-block; padding:8px 16px; border-radius:6px; background:${statusColor}1A; color:${statusColor}; font-weight:700;">
      ${statusLabel}
    </p>

    <p style="margin-top:24px; font-size:13px; color:#666;">
      This objective score is one part of the assessment. Your written answers and (if applicable) the
      in-person practical assessment are reviewed separately, and final selection also depends on a
      structured interview and reference checks — this email is not a final hiring decision.
    </p>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Your Telth Care Manager assessment result: ${statusLabel}`,
      html,
    });
    return true;
  } catch (err) {
    console.error('Resend email failed:', err);
    return false; // scoring/storage should not fail just because the email failed
  }
}
