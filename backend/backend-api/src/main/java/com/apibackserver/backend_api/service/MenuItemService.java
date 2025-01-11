package com.apibackserver.backend_api.service;
import com.apibackserver.backend_api.dto.MenuItemDto;

import java.util.List;

public interface MenuItemService {
    List<MenuItemDto> getMenuTree();
}