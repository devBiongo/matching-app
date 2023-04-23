package com.awe.model.dto;

import com.awe.model.vo.TableDefinitionVO;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 生成的返回值
 *
 * @author BionGo
 */
@Data
public class GenerateDto implements Serializable {

    private TableDefinitionVO tableDefinitionVO;

    private String createSql;

    private List<Map<String, Object>> dataList;

    private String insertSql;

    private String dataJson;

    private String javaEntityCode;

    private String javaObjectCode;

    private String typescriptTypeCode;

    private static final long serialVersionUID = 7122637163626243606L;
}
