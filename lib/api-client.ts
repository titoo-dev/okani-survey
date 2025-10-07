/**
 * API Client utility for making API requests
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  issues?: any[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.error || data.message || "API request failed",
      response.status,
      data,
    );
  }

  return data;
}

/**
 * Descriptors API Client
 */
export const descriptorsApi = {
  /**
   * Get all descriptors or filter by type
   */
  getAll: async (type?: string): Promise<ApiResponse> => {
    const url = type
      ? `/api/descriptors?type=${encodeURIComponent(type)}`
      : "/api/descriptors";
    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * Get a single descriptor by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/descriptors/${id}`);
    return handleResponse(response);
  },

  /**
   * Create a new descriptor
   */
  create: async (data: {
    type: string;
    value: string;
    label: string;
  }): Promise<ApiResponse> => {
    const response = await fetch("/api/descriptors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Update a descriptor
   */
  update: async (
    id: string,
    data: Partial<{ type: string; value: string; label: string }>,
  ): Promise<ApiResponse> => {
    const response = await fetch(`/api/descriptors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Delete a descriptor
   */
  delete: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/descriptors/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  /**
   * Get all unique descriptor types
   */
  getTypes: async (): Promise<ApiResponse> => {
    const response = await fetch("/api/descriptors/types");
    return handleResponse(response);
  },

  /**
   * Create multiple descriptors at once
   */
  createBulk: async (
    descriptors: Array<{
      type: string;
      value: string;
      label: string;
    }>,
  ): Promise<ApiResponse> => {
    const response = await fetch("/api/descriptors/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descriptors }),
    });
    return handleResponse(response);
  },

  /**
   * Delete all descriptors of a specific type
   */
  deleteBulk: async (type: string): Promise<ApiResponse> => {
    const response = await fetch(
      `/api/descriptors/bulk?type=${encodeURIComponent(type)}`,
      {
        method: "DELETE",
      },
    );
    return handleResponse(response);
  },
};

/**
 * Surveys API Client
 */
export const surveysApi = {
  /**
   * Get all surveys with optional filtering and pagination
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    email?: string;
    stageReached?: string;
    dossierId?: string;
    userType?: string;
  }): Promise<ApiResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.email) searchParams.set("email", params.email);
    if (params?.stageReached)
      searchParams.set("stageReached", params.stageReached);
    if (params?.dossierId) searchParams.set("dossierId", params.dossierId);
    if (params?.userType) searchParams.set("userType", params.userType);

    const url =
      searchParams.toString().length > 0
        ? `/api/surveys?${searchParams}`
        : "/api/surveys";
    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * Check if an email has already submitted a survey
   */
  checkEmail: async (email: string): Promise<ApiResponse<{
    hasSubmitted: boolean;
    survey: {
      id: string;
      dossierId: string;
      createdAt: string;
      stageReached: string;
    } | null;
  }>> => {
    const response = await fetch("/api/surveys/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  /**
   * Get a single survey by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/surveys/${id}`);
    return handleResponse(response);
  },

  /**
   * Create a new survey
   */
  create: async (data: any): Promise<ApiResponse> => {
    const response = await fetch("/api/surveys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Update a survey
   */
  update: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await fetch(`/api/surveys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * Delete a survey
   */
  delete: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/surveys/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  /**
   * Get survey statistics
   */
  getStats: async (): Promise<ApiResponse> => {
    const response = await fetch("/api/surveys/stats");
    return handleResponse(response);
  },

  /**
   * Export surveys as JSON or CSV
   */
  export: async (params?: {
    format?: "json" | "csv";
    stageReached?: string;
    userType?: string;
  }): Promise<any> => {
    const searchParams = new URLSearchParams();
    if (params?.format) searchParams.set("format", params.format);
    if (params?.stageReached)
      searchParams.set("stageReached", params.stageReached);
    if (params?.userType) searchParams.set("userType", params.userType);

    const url =
      searchParams.toString().length > 0
        ? `/api/surveys/export?${searchParams}`
        : "/api/surveys/export";

    const response = await fetch(url);

    if (params?.format === "csv") {
      return response.text();
    }

    return handleResponse(response);
  },
};
