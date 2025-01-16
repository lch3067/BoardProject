package com.apibackserver.backend_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apibackserver.backend_api.dto.MenuItemDto;
import com.apibackserver.backend_api.service.MenuItemService;

@RestController
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping("/menus")
    public List<MenuItemDto> getMenuItems() {
        return menuItemService.getMenuTree();
    }
}