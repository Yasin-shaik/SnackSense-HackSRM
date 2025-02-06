import UserDetails from "../Models/UserDetails.js";

export const userDetails = async (req, res) => {
  try {
    // Validate input
    const { userData, email } = req.body;
    if (!userData || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { age, gender, weight, height, dietType, allergies, activityLevel, waterIntake, sleepHours } = userData;

    // Create new user details document
    const user = new UserDetails({
      email,
      age,
      gender,
      weight,
      height,
      dietType,
      allergies,
      activityLevel,
      waterIntake,
      sleepHours,
    });

    // Save user details
    await user.save();

    // Send success response
    return res.status(201).json({ message: "User details saved successfully", user });

  } catch (error) {
    console.error("User details error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
