package com.apibackserver.backend_api.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import com.apibackserver.backend_api.dto.MenuItemDto;

import java.util.List;

@Mapper
public interface MenuItemMapper {
    // 최상위 메뉴 가져오기
    List<MenuItemDto> findRootMenus();

    // 특정 메뉴의 자식 가져오기
    List<MenuItemDto> findChildren(@Param("parentId") String parentId);
}
