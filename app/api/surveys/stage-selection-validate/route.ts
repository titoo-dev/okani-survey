import { NextRequest, NextResponse } from "next/server";
import { validateStageSelection } from "@/app/actions/stage-selection";

/**
 * Validates stage selection data from the form.
 * 
 * This endpoint:
 * 1. Checks if the user has filed at ANUTTC
 * 2. Validates email and stage reached using Zod schema
 * 3. Checks if the email has already submitted a survey (status: SENT)
 * 4. Creates a new PENDING survey or updates an existing PENDING one
 * 
 * @param request - NextRequest containing formData with:
 *   - hasFiledAtAnuttc: boolean (must be true)
 *   - email: string (user's email address)
 *   - stageReached: string (stage descriptor ID)
 * 
 * @returns NextResponse with:
 *   - success: boolean
 *   - data: { stageReached, email } if successful
 *   - errors: string[] if validation fails
 *   - alreadySubmitted: boolean if email already has a SENT survey
 * 
 * @see {@link validateStageSelection} for the validation logic
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const result = await validateStageSelection(null, formData);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.errors,
          alreadySubmitted: result.alreadySubmitted,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Error validating stage selection:", error);
    return NextResponse.json(
      {
        success: false,
        errors: ["Une erreur est survenue lors de la validation"],
      },
      { status: 500 }
    );
  }
}
