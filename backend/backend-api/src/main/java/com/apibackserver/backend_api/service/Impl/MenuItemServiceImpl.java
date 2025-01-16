package com.apibackserver.backend_api.service.Impl;

import com.apibackserver.backend_api.dto.MenuItemDto;
import com.apibackserver.backend_api.mapper.MenuItemMapper;
import com.apibackserver.backend_api.service.MenuItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemMapper menuItemMapper;

    public MenuItemServiceImpl(MenuItemMapper menuItemMapper) {
        this.menuItemMapper = menuItemMapper;
    }

    @Override
    public List<MenuItemDto> getMenuTree() {
        // 최상위 메뉴 가져오기
        List<MenuItemDto> rootMenus = menuItemMapper.findRootMenus();

        // JSON 트리 구조로 변환
        return rootMenus.stream()
                .map(this::buildMenuTree)
                .collect(Collectors.toList());
    }

    private MenuItemDto buildMenuTree(MenuItemDto menu) {
        // 자식 메뉴 가져오기
        List<MenuItemDto> children = menuItemMapper.findChildren(menu.getMenuId())
                .stream()
                .map(this::buildMenuTree)
                .collect(Collectors.toList());

        menu.setChildren(children);
        return menu;
    }
}