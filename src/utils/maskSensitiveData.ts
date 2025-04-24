export function maskSensitiveData(body: Record<string, any>): Record<string, any> {
    const masked = { ...body };
  
    const sensitiveFields = ["password", "email", "phone_number", "profile_picture", "address"];
    for (const field of sensitiveFields) {
      if (masked[field]) masked[field] = "***";
    }
  
    return masked;
  }