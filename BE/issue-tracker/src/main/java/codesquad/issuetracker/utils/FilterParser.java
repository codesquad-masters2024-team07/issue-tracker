package codesquad.issuetracker.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class FilterParser {

    private static final String MANY_TO_MANY_TABLE = "label";

    public static Map<String, Object> parseConditions(String filter) {
        Map<String, Object> conditions = new HashMap<>();

        String[] pairs = filter.split(",");

        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                if (key.equals(MANY_TO_MANY_TABLE)) {
                    key = "ISSUE_LABEL";
                }
                String valueStr = keyValue[1].trim();
                Object value;

                if (isInteger(valueStr)) {
                    value = Integer.parseInt(valueStr);
                } else if (isBoolean(valueStr)) {
                    value = Boolean.parseBoolean(valueStr);
                } else {
                    value = valueStr;
                }

                conditions.put(key.toUpperCase(), value);
            }
        }

        return conditions;
    }

    public static List<String> parseJoinTables(Map<String, Object> conditions) {
        Set<String> keys = conditions.keySet().stream().map(String::toUpperCase).collect(Collectors.toSet());
        return List.copyOf(keys);
    }

    private static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static boolean isBoolean(String str) {
        return "true".equalsIgnoreCase(str) || "false".equalsIgnoreCase(str);
    }
}
