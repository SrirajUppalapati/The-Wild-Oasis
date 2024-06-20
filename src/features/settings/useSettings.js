import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettings as getSettingsAPI,
  updateSetting as updateSettingAPI,
} from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useGetSettings() {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettingsAPI,
  });
  return {
    isPending,
    settings,
    error,
  };
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: ({ data }) => updateSettingAPI(data),
    onSuccess: () => {
      toast.success("Successfully Changed the settings");
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: () => toast.error("Couldnt change the settings"),
  });
  return { isUpdating, updateSetting };
}
