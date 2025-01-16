package com.apibackserver.backend_api.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemDto {

    private String menuId;
    private String superMenuId; // 부모 ID
    private String menuUrl;
    private String menuDesc;
    private List<MenuItemDto> children = new ArrayList<>();
}
